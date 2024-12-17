import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { CommonModule } from '@angular/common';
import { LoadingInterceptor } from '../interceptors/loading.interceptor';

describe('LoadingInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let loadingService: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [
        LoadingService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoadingInterceptor,
          multi: true
        }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    loadingService = TestBed.inject(LoadingService);
  });

  it('should show and hide loading indicator', () => {
    // Espía a la carga
    spyOn(loadingService, 'setLoading');

    // Realiza una solicitud HTTP
    httpClient.get('/test').subscribe();

    // Verifica si se ha llamado setLoading(true)
    expect(loadingService.setLoading).toHaveBeenCalledWith(true);

    // Simula la respuesta de la solicitud HTTP
    const req = httpMock.expectOne('/test');
    expect(req.request.method).toBe('GET');
    req.flush({});

    // Verifica si se ha llamado setLoading(false) después de la respuesta
    expect(loadingService.setLoading).toHaveBeenCalledWith(false);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no hay solicitudes pendientes
  });
});
