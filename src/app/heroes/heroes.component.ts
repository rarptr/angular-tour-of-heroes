import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent implements OnInit, OnDestroy {
  heroes$ = new BehaviorSubject<Hero[]>([]);

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
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

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id).subscribe(x => console.log(x));
    this.heroes$.next(this.heroes$.getValue().filter(heroes => heroes.id !== hero.id));
  }

  ngOnDestroy(): void {
    this.heroes$.unsubscribe();
  }
}
