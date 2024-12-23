import { Observable } from 'rxjs';
import { Hero } from '../entities/hero';
import { InjectionToken } from '@angular/core';

export interface HeroRepository {
  getTotalHeroes(): number;
  getHeroes(): Observable<Hero[]>;
  getHeroById(id: number): Observable<Hero | undefined>;
  searchHeroesByName(name: string): Observable<Hero[]>;
  addHero(hero: Hero): Observable<void>;
  updateHero(hero: Hero): Observable<void>;
  deleteHero(id: number): Observable<void>;
  resetList(): Observable<void>;
}

export const HERO_REPOSITORY = new InjectionToken<HeroRepository>('heroRepository');