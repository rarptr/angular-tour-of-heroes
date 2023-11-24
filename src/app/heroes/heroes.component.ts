import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit, OnDestroy {
  heroes$ = new BehaviorSubject<Hero[]>([]);

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    // [x] 09:35 переделать на async pipe
    this.heroService.getHeroes().subscribe(heroes => this.heroes$.next(heroes))
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }

    // TODO: почему разрешён { name } as Hero
    this.heroService.addHero({ name } as Hero).subscribe(hero => this.heroes$.next([...this.heroes$.getValue(), hero]));
  }

  // [x] 09:45 Реализовать отписку (много разных способов, Павел использует takeUntil)
  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id).subscribe(x => console.log(x));
    this.heroes$.next(this.heroes$.getValue().filter(heroes => heroes.id !== hero.id));
  }

  ngOnDestroy(): void {
    this.heroes$.unsubscribe();
  }
}
