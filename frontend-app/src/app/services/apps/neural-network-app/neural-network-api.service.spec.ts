import { TestBed } from '@angular/core/testing';

import { NeuralNetworkApiService } from './neural-network-api.service';

describe('NeuralNetworkApiService', () => {
  let service: NeuralNetworkApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeuralNetworkApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
