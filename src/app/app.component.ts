import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingSpinnerComponent } from "./shared/components/loading-spinner/loading-spinner.component";
import { HeroListComponent } from './features/hero-management/components/hero-list/hero-list.component';
import { HeroFormComponent } from './features/hero-management/components/hero-form/hero-form.component';

const routes = [
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  { path: 'heroes', component: HeroListComponent },
  { path: 'heroes/add', component: HeroFormComponent },
  { path: 'heroes/edit/:id', component: HeroFormComponent },
  { path: '**', redirectTo: 'heroes' },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'hero-challenge';
}
