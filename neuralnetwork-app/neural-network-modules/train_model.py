import argparse
import numpy as np
import os
import logging
import tensorflow as tf
import tensorflow_hub as hub
import tensorflow_datasets as tfds


EPOCHS = 5
BATCH_SIZE = 10
LEARNING_RATE = 0.001
DROPOUT_RATE = 0.3
EARLY_STOPPING_TRAIN_ACCURACY = 0.995
TF_AUTOTUNE = tf.data.experimental.AUTOTUNE
TF_HUB_MODEL_URL = 'https://tfhub.dev/google/inaturalist/inception_v3/feature_vector/5'
TF_DATASET_NAME = 'tf_flowers'
IMAGE_SIZE = (192, 192)
SHUFFLE_BUFFER_SIZE = 100
MODEL_VERSION = '1'
MODEL_EXPORT_PATH = '/home/stephen/Software/Python/General/Jupyter_Notebooks/Neural_Networks/flowers/'
MODEL_EXPORT_NAME = 'flower_network'


class EarlyStoppingCallback(tf.keras.callbacks.Callback):
    def on_epoch_end(self, epoch, logs={}):
        if(logs.get('accuracy') > EARLY_STOPPING_TRAIN_ACCURACY):
            print(f"\nEarly stopping at {logs.get('accuracy'):.4f} > {EARLY_STOPPING_TRAIN_ACCURACY}!\n")
            self.model.stop_training = True


def parse_args():
    parser = argparse.ArgumentParser()

    # hyperparameters sent by the client are passed as command-line arguments to the script
    parser.add_argument('--epochs', type=int, default=EPOCHS)
    parser.add_argument('--batch_size', type=int, default=BATCH_SIZE)
    parser.add_argument('--learning_rate', type=float, default=LEARNING_RATE)

    # model_dir is always passed in from SageMaker. By default this is a S3 path under the default bucket.
    parser.add_argument('--model_dir', type=str, default=MODEL_EXPORT_PATH)
    parser.add_argument('--model_name', type=str, default=MODEL_EXPORT_NAME)
    parser.add_argument('--model_version', type=str, default=MODEL_VERSION)

    return parser.parse_known_args()


def set_gpu_memory_growth():
    gpus = tf.config.list_physical_devices('GPU')

    if gpus:
        print("\nGPU Available.")
        print(f"Number of GPU: {len(gpus)}")
        try:
            for gpu in gpus:
                tf.config.experimental.set_memory_growth(gpu, True)
                print(f"Enabled Memory Growth on {gpu.name}\n")
                print()
        except RuntimeError as e:
            print(e)

    print()


def get_datasets(dataset_name):
    tfds.disable_progress_bar()
    splits = ['train[:70%]', 'train[70%:85%]', 'train[85%:]']
    splits, ds_info = tfds.load(dataset_name, split=splits, with_info=True)
    (ds_train, ds_validation, ds_test) = splits

    return (ds_train, ds_validation, ds_test), ds_info


def parse_image(features):
    image = features['image']
    image = tf.image.resize(image, IMAGE_SIZE) / 255.0
    return image, features['label']


def training_pipeline(train_raw, batch_size):
    train_preprocessed = train_raw.shuffle(SHUFFLE_BUFFER_SIZE).map(
        parse_image, num_parallel_calls=TF_AUTOTUNE).cache().batch(batch_size).prefetch(TF_AUTOTUNE)

    return train_preprocessed


def test_pipeline(test_raw, batch_size):
    test_preprocessed = test_raw.map(parse_image, num_parallel_calls=TF_AUTOTUNE).cache(
    ).batch(batch_size).prefetch(TF_AUTOTUNE)

    return test_preprocessed


def create_model(train_batches, val_batches, learning_rate):
    augmentations = tf.keras.Sequential([
      tf.keras.layers.experimental.preprocessing.RandomRotation(40, input_shape=IMAGE_SIZE + (3,)),
      tf.keras.layers.experimental.preprocessing.RandomTranslation(0, 0.2),
      tf.keras.layers.experimental.preprocessing.RandomTranslation(0.2, 0),
      tf.keras.layers.experimental.preprocessing.RandomZoom(0.2, 0.2),
      tf.keras.layers.experimental.preprocessing.RandomFlip(mode="horizontal")
    ])

    base_model = hub.KerasLayer(TF_HUB_MODEL_URL,
                                trainable=False)

    model = tf.keras.Sequential([
        augmentations,
        base_model,
        tf.keras.layers.Dropout(DROPOUT_RATE),
        tf.keras.layers.Dense(NUM_CLASSES, activation='softmax')
    ])
    
    optimizer = tf.keras.optimizers.Adam(learning_rate=learning_rate)
    early_stop_callback = EarlyStoppingCallback()

    model.compile(optimizer=optimizer,
                  loss='sparse_categorical_crossentropy', metrics=['accuracy'])

    model.summary()

    model.fit(train_batches, epochs=args.epochs,
              validation_data=val_batches,
              callbacks=[early_stop_callback])

    return model


if __name__ == "__main__":
    args, _ = parse_args()
    batch_size = args.batch_size
    epochs = args.epochs
    learning_rate = args.learning_rate
    print(f"\nBatch Size = {batch_size}, Epochs = {epochs}, Learning Rate = {learning_rate}\n")

    set_gpu_memory_growth()

    (ds_train, ds_validation, ds_test), ds_info = get_datasets(TF_DATASET_NAME)
    NUM_CLASSES = ds_info.features['label'].num_classes

    print(f"\nNumber of Training dataset samples: {tf.data.experimental.cardinality(ds_train)}")
    print(f"Number of Validation dataset samples: {tf.data.experimental.cardinality(ds_validation)}")
    print(f"Number of Test dataset samples: {tf.data.experimental.cardinality(ds_test)}")
    print(f"Number of Flower Categories: {NUM_CLASSES}\n")

    train_batches = training_pipeline(ds_train, batch_size)
    validation_batches = test_pipeline(ds_validation, batch_size)
    test_batches = test_pipeline(ds_test, batch_size)

    model = create_model(train_batches, validation_batches, learning_rate)
    eval_results = model.evaluate(test_batches)

    for metric, value in zip(model.metrics_names, eval_results):
        print(metric + ': {:.4f}'.format(value))

    export_path = os.path.join(args.model_dir, args.model_name, args.model_version)
    
    print(f'\nModel version: {args.model_version} exported to: {export_path}\n')

    model.save(export_path)