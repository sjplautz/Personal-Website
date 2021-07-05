import { TestBed } from '@angular/core/testing';

import { NeuralNetworkAppService } from './neural-network-app.service';

describe('NeuralNetworkAppService', () => {
  let service: NeuralNetworkAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeuralNetworkAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
