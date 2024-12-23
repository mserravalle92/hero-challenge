import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { CommonModule } from '@angular/common';
import { loadingInterceptor } from '../interceptors/loading.interceptor';
import { of } from 'rxjs';

describe('LoadingInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let loadingService: LoadingService;

  const mockHttpClient = {
    get: jasmine.createSpy('get').and.returnValue(of({}))
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [
        LoadingService,
        {
          provide: HttpClient,
          useValue: mockHttpClient
        },
        provideHttpClient(
          withInterceptors([loadingInterceptor])
        ),
        provideHttpClientTesting()
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    loadingService = TestBed.inject(LoadingService);
  });

  it('should show and hide loading indicator', () => {
    spyOn(loadingService, 'setLoading');

    httpClient.get('/test').subscribe();

    expect(loadingService.setLoading).toHaveBeenCalledWith(true);

    const req = httpMock.expectOne('/test');
    expect(req.request.method).toBe('GET');
    req.flush({});

    expect(loadingService.setLoading).toHaveBeenCalledWith(false);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
