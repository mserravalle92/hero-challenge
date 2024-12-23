import { HERO_REPOSITORY } from './domain/repositories/hero-repository';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { InMemoryHeroService } from './features/hero-management/services/in-memory-hero.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

@NgModule({
  providers: [
    provideHttpClient(withInterceptors([loadingInterceptor])),
    { provide: HERO_REPOSITORY, useClass: InMemoryHeroService },
  ],
  imports: [BrowserAnimationsModule],
})
export class AppModule {}