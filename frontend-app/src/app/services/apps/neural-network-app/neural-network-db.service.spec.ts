import { TestBed } from '@angular/core/testing';

import { NeuralNetworkDbService } from './neural-network-db.service';

describe('NeuralNetworkDbService', () => {
  let service: NeuralNetworkDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeuralNetworkDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
