// src/app/features/hero-management/presentation/hero-form.component.ts
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { InMemoryHeroService } from '../../services/in-memory-hero.service';
import { Hero } from '../../../../domain/entities/hero';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HERO_REPOSITORY, HeroRepository } from 'app/domain/repositories/hero-repository';
import { UppercaseDirective } from 'app/shared/directives/uppercase.directive';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  imports: [ 
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    UppercaseDirective
  ],
  providers: [
    { provide: HERO_REPOSITORY, useClass: InMemoryHeroService }
  ],
  styleUrls: ["./hero-form.component.scss"]

})
export class HeroFormComponent implements OnInit {
    hero: Hero | undefined;
    heroForm: FormGroup;
    isEditMode: boolean = false;
    heroService: HeroRepository;


    constructor(
      private fb: FormBuilder,
      @Inject(HERO_REPOSITORY) heroService: HeroRepository,
      private router: Router,
      private route: ActivatedRoute,
    ) {
      this.heroForm = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        superPower: ['', Validators.required],
      });
      this.heroService = heroService;
    }
  
    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        const idNumber: number = parseInt(id);
        this.isEditMode = true;
        this.heroService.getHeroById(idNumber).subscribe({
          next: (hero) => {
            this.hero = hero;
            if (hero) {
              this.heroForm.patchValue(hero);
            }
          },
          error: () => {
            alert('Hero not found');
            this.router.navigate(['/heroes']);
          },      
        });
      }
    }
  
    onSubmit(): void {
      if (this.heroForm.valid) {
        const hero = this.heroForm.value as Hero;
        if (this.isEditMode) {
          this.heroService.updateHero(hero).subscribe(
            {
              next: () => this.router.navigate(['/heroes']),
              error: (error: any) => console.error('Error al actualizar héroe:', error)
            }
          );
        } else {
          this.heroService.addHero(hero).subscribe(
            {
              next: () => this.router.navigate(['/heroes']),
              error: (error: any) => console.error('Error al agregar héroe:', error)
            }
            
          );
        }
      }
    }
  
    onCancel(): void {
      this.router.navigate(['/heroes']);
    }
}