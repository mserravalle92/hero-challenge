import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Route } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { HeroListComponent } from './app/features/hero-management/components/hero-list/hero-list.component';
import { HeroFormComponent } from './app/features/hero-management/components/hero-form/hero-form.component';
import { provideHttpClient } from '@angular/common/http';

const routes: Route[] = [
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  { path: 'heroes', component: HeroListComponent },
  { path: 'heroes/add', component: HeroFormComponent },
  { path: 'heroes/edit/:id', component: HeroFormComponent },
  { path: '**', redirectTo: 'heroes', pathMatch: 'full' },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations()
  ]
}).catch((err) => console.error(err));
