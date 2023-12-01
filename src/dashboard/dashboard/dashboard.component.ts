import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Hero } from '../../app/hero';
import { HeroService } from '../../app/hero.service';
import { Observable, Subject, map, of, take, takeUntil } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
    public heroes$!: Observable<Hero[]>;
    private destroy$ = new Subject<void>();

    constructor(private heroService: HeroService) { }

    ngOnInit(): void {
        // [x] map преобразует коллекцию, обрезая её
        this.heroes$ = this.heroService.getHeroes()
            .pipe(
                map(heroes => heroes.slice(1, 5)),
                takeUntil(this.destroy$)
            );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
