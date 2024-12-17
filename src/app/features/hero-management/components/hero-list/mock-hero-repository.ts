import { Observable, of } from 'rxjs';
import { HeroRepository } from '../../../../domain/repositories/hero-repository';
import { Hero } from '../../../../domain/entities/hero';

export class MockHeroRepository implements HeroRepository {

  getHeroes() {
    return of([
      { id: 1, name: 'Hero 1', superPower: 'Flying' },
      { id: 2, name: 'Hero 2', superPower: 'Strength' },
      { id: 3, name: 'Hero 3', superPower: 'Speed' },
      { id: 4, name: 'Hero 4', superPower: 'Invisibility' },
      { id: 5, name: 'Hero 5', superPower: 'Telepathy' },
    ]);
  }

  getHeroById(id: number) {
    return of(
      { id, name: `Hero ${id}`, superPower: 'Unknown Power' } as Hero | undefined
    );
  }

  searchHeroesByName(name: string) {
    return of([
      { id: 1, name: 'Hero 1', superPower: 'Flying' },
      { id: 2, name: 'Hero 2', superPower: 'Strength' },
    ].filter(hero => hero.name.toLowerCase().includes(name.toLowerCase())));
  }

  addHero(hero: Hero): Observable<void> {
    return of(undefined); 
  }

  updateHero(hero: Hero): Observable<void> {
    return of(undefined); 
  }

  deleteHero(id: number): Observable<void> {
    return of(undefined); 
  }
}
