import { HERO_REPOSITORY } from './domain/repositories/hero-repository';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { NgModule } from '@angular/core';
import { InMemoryHeroService } from './features/hero-management/services/in-memory-hero.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HERO_REPOSITORY, useClass: InMemoryHeroService },
  ],
  imports: [BrowserAnimationsModule],
})
export class AppModule {}