import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroListComponent } from './features/hero-management/components/hero-list/hero-list.component';
import { HeroFormComponent } from './features/hero-management/components/hero-form/hero-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  { path: 'heroes', component: HeroListComponent },
  { path: 'heroes/add', component: HeroFormComponent },
  { path: 'heroes/edit/:id', component: HeroFormComponent },
  { path: '**', redirectTo: 'heroes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
