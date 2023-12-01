import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { Hero } from '../../app/hero';
import { HeroService } from '../../app/hero.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSearchComponent implements OnInit, OnDestroy {
  public heroes$!: Observable<Hero[]>;
  // [x] 09:00 Subject будет не нужен, когда переделаю на реактивную форму (valueChanges)
  private destroy$ = new Subject<void>();

  public heroSearch = new FormControl<string>("", [Validators.required]);

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroes$ = this.heroSearch.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      map(x => x ?? ""),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
