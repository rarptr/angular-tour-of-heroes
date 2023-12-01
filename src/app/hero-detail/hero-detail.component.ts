import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, catchError, map, of, switchMap, takeUntil } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent implements OnInit, OnDestroy {
    public hero$ = new BehaviorSubject<Hero | undefined>(undefined);
    public isLoaded$ = new BehaviorSubject<boolean>(true);

    public heroName = new FormControl<string>('', [Validators.required]);

    private destroy$ = new Subject<void>();
 
    // TODO: на каком этапе лучше инициализировать Observable
    private routeId = this.route.params.pipe(
        takeUntil(this.destroy$),
        map(p => parseInt(p['id'])),
        switchMap(id => this.heroService.getHero(id)
            .pipe(
                catchError(() => {
                    console.error('Error: bad request');
                    return of(undefined);
                })
            )));

    constructor(
        private route: ActivatedRoute,
        private heroService: HeroService,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.getHero();
        this.heroName.valueChanges.subscribe(hero => this.hero$.next({ ...this.hero$.getValue(), name: hero ?? '' } as Hero));
    }

    getHero(): void {
        this.routeId.subscribe(hero => {
            if(hero){
                this.heroName.setValue(hero.name);
                this.hero$.next(hero);
            }
            this.isLoaded$.next(false);
        });
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        const hero = this.hero$.getValue();
        if (hero) {
            this.heroService
                .updateHero(hero)
                .subscribe(() => this.goBack());
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
