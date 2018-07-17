import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ServiceHttpService } from './service-http.service';

describe('ServiceHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceHttpService]
    });
  });

  it('should be created', inject([ServiceHttpService], (service: ServiceHttpService) => {
    expect(service).toBeTruthy();
  }));

  it('should return two items', inject(
    [ServiceHttpService, HttpTestingController],
    (service: ServiceHttpService, httpMock: HttpTestingController) => {
      expect(service).toBeTruthy();
      service.getListOfStrings().subscribe(res => expect(res.length).toBe(2));
      const request = httpMock.expectOne('api/listOfStrings');
      request.flush(['one', 'two']);
  }));
});
