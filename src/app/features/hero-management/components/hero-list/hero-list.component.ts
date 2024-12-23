import { Component, Inject, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Hero } from '../../../../domain/entities/hero';
import { InMemoryHeroService } from '../../services/in-memory-hero.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HERO_REPOSITORY, HeroRepository } from '../../../../domain/repositories/hero-repository';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [
    { provide: HERO_REPOSITORY, useClass: InMemoryHeroService }
  ],
  styleUrls: ["./hero-list.component.scss"]
})
export class HeroListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'superPower', 'actions'];
  heroesDataSource: MatTableDataSource<Hero>;
  searchText = '';
  totalHeroes = 0;  
  pageSize = 5;    
  currentPage = 0;

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.heroesDataSource){
      this.heroesDataSource.paginator = value;
    }
  }
  heroService: HeroRepository;

  constructor(@Inject(HERO_REPOSITORY) heroService: HeroRepository, private router: Router, private changeDetectorRef: ChangeDetectorRef) {
    this.heroService = heroService;
    this.heroesDataSource = new MatTableDataSource<Hero>();
  }

  ngAfterViewInit() {
    this.heroesDataSource.paginator = this.paginator;
    this.totalHeroes = this.heroService.getTotalHeroes();
    this.changeDetectorRef.detectChanges();
    this.loadHeroes(); 
  }

  loadHeroes() {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroesDataSource.data = heroes.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
      this.changeDetectorRef.detectChanges();
    });
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.totalHeroes = this.heroService.getTotalHeroes();
    this.loadHeroes();
  }

  searchHeroes() {
    if (this.searchText.trim() === '') {
      this.totalHeroes = this.heroService.getTotalHeroes();
      this.heroService.resetList().subscribe((_: void) => {
        this.loadHeroes();
      });
    } else {
      this.heroService.searchHeroesByName(this.searchText).subscribe(heroes => {
        this.totalHeroes = heroes.length;
        this.loadHeroes();

      });
    }
  }

  addHero() {
    this.router.navigate(['/heroes/add']);
  }

  editHero(hero: Hero) {
    this.router.navigate(['/heroes/edit', hero.id]);
  }

  deleteHero(hero: Hero) {
    if (confirm(`Estás seguro que deseas elimina a ${ hero.name }?` )) {
      this.heroService.deleteHero(hero.id).subscribe(() => {
        this.loadHeroes(); 
      });
    }
  }
}
