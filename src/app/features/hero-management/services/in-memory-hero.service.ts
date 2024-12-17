import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HeroRepository } from '../../../domain/repositories/hero-repository';
import { Hero } from '../../../domain/entities/hero';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InMemoryHeroService implements HeroRepository {
  private heroesUrl = 'data/heroes.data.json'; 
  private heroesSubject = new BehaviorSubject<Hero[]>([]);

  constructor(private http: HttpClient) {
    this.loadInitialHeroes();
  }


  private loadInitialHeroes(): void {
    const storedHeroesJson: string | null = localStorage.getItem('heroes');
    if (storedHeroesJson) {
      const storedHeroes: Hero[] = JSON.parse(storedHeroesJson);
      this.heroesSubject.next(storedHeroes);
      return;  
    }
  
    this.http.get<Hero[]>(this.heroesUrl).subscribe({
      next: (heroes) => {
        this.heroesSubject.next(heroes);
        localStorage.setItem('heroes', JSON.stringify(heroes));
      },
      error: (err) => console.error('Error loading heroes:', err),
    });
  }
  
  private saveHeroes(): void {
    const heroes = this.heroesSubject.getValue();
    localStorage.setItem('heroes', JSON.stringify(heroes));
  }
  

  getHeroes(): Observable<Hero[]> {
    return this.heroesSubject.asObservable();
  }

  getHeroById(id: number): Observable<Hero | undefined> {
    const heroes = this.heroesSubject.getValue();
    const hero = heroes.find((h) => h.id === id);
    return new BehaviorSubject<Hero | undefined>(hero).asObservable();
  }


  searchHeroesByName(name: string): Observable<Hero[]> {
    const lowerName = name.toLowerCase();
    const heroes = this.heroesSubject.getValue();
    const filteredHeroes = heroes.filter((hero) =>
      hero.name.toLowerCase().includes(lowerName)
    );
    return new BehaviorSubject<Hero[]>(filteredHeroes).asObservable();
  }


  addHero(hero: Hero): Observable<void> {
    const heroes = this.heroesSubject.getValue();
    hero.id = this.generateId(heroes);
    this.heroesSubject.next([...heroes, hero]);
    this.saveHeroes();
    return new BehaviorSubject<void>(undefined).asObservable();
  }


  updateHero(hero: Hero): Observable<void> {
    const heroes = this.heroesSubject.getValue();
    const index = heroes.findIndex((h) => {
      return h.id === hero.id
    });
    if (index !== -1) {
      heroes[index] = hero;
      this.heroesSubject.next([...heroes]);
    }
    this.saveHeroes();
    return new BehaviorSubject<void>(undefined).asObservable();
  }

 
  deleteHero(id: number): Observable<void> {
    const heroes = this.heroesSubject.getValue();
    const filteredHeroes = heroes.filter((hero) => hero.id !== id);
    this.heroesSubject.next(filteredHeroes);
    this.saveHeroes();
    return new BehaviorSubject<void>(undefined).asObservable();
  }


  private generateId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map((h) => h.id)) + 1 : 1;
  }
}
