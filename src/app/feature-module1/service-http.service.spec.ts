import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ServiceHttpService } from './service-http.service';
import { HttpRequest } from '../../../node_modules/@angular/common/http';

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
      service.getListOfStrings().subscribe(res => expect(res.length).toBe(2));
      const request = httpMock.expectOne('api/listOfStrings');
      request.flush(['one', 'two']);
  }));

  it('should add article', inject(
    [ServiceHttpService, HttpTestingController],
    (service: ServiceHttpService, httpMock: HttpTestingController) => {
      service.createNewArticle(
        {title: 'Article title', content: 'Bla bla bla'})
        .subscribe( _ => {});
      const request = httpMock.expectOne('api/article/add');
  }));
  it('should return the created article', inject(
    [ServiceHttpService, HttpTestingController],
    (service: ServiceHttpService, httpMock: HttpTestingController) => {
      const testArticle = {title: 'Article title', content: 'Bla bla bla'};
      service.createNewArticle(
        testArticle)
        .subscribe( _ => {});
      const request = httpMock.expectOne('api/article/add');
      request.flush(testArticle);
  }));
  it('should use the correct method', inject(
    [ServiceHttpService, HttpTestingController],
    (service: ServiceHttpService, httpMock: HttpTestingController) => {
      const testArticle = {title: 'Article title', content: 'Bla bla bla'};
      service.createNewArticle(
        testArticle)
        .subscribe( _ => {});
      httpMock.expectOne( {method: 'POST'}, 'Should use POST');
  }));
  it('should set the correct content type', inject(
    [ServiceHttpService, HttpTestingController],
    (service: ServiceHttpService, httpMock: HttpTestingController) => {
      const testArticle = {title: 'Article title', content: 'Bla bla bla'};
      service.createNewArticle(
        testArticle)
        .subscribe( _ => {});
      httpMock.expectOne( (request: HttpRequest<any>) => {
        return request.headers.get('Content-Type') === 'application/json';
      }, 'Should set application/json as content type');
  }));

  it('should return null if already exists', inject(
    [ServiceHttpService, HttpTestingController],
    (service: ServiceHttpService, httpMock: HttpTestingController) => {
      const testArticle = {title: 'Article title', content: 'Bla bla bla'};
      service.createNewArticle(
        testArticle)
        .subscribe( result => expect(result).toBeFalsy());
      httpMock
      .expectOne({url: 'api/article/add'}, 'Should use the correct url')
      .flush(null, {status: 200, statusText: 'Already exists'});
    }));

    it('should return the new item', inject(
      [ServiceHttpService, HttpTestingController],
      (service: ServiceHttpService, httpMock: HttpTestingController) => {
        const testArticle = {title: 'Article title', content: 'Bla bla bla'};
        service.createNewArticle(
          testArticle)
          .subscribe( result => expect(result).toBeTruthy());
        httpMock
        .expectOne({url: 'api/article/add'}, 'Should use the correct url')
        .flush(testArticle, {status: 201, statusText: 'Article added'});
      }));


  it('should throw and error with the correct error message ', inject(
    [ServiceHttpService, HttpTestingController],
    (service: ServiceHttpService, httpMock: HttpTestingController) => {
      const testArticle = {title: 'Article title', content: 'Bla bla bla'};
      service.createNewArticle(
        testArticle)
        .subscribe( _ => {}, err => expect(err).toBe('Connection down'));
      httpMock
      .expectOne( {url: 'api/article/add'}, 'Should use the correct url')
      .error(new ErrorEvent('Connection error',
      {
        error: new Error('Connection down b'),
        message : 'Connection down'
    }));
      // .flush(null, {status: 401, statusText: 'Unauthorized'});
  }));
});
