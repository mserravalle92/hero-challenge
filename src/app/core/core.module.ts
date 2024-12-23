import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './interceptors/loading.interceptor';

@NgModule({
  providers: [
    provideHttpClient(withInterceptors([loadingInterceptor])),
  ],
})
export class CoreModule {}
