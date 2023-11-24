import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable, map, of } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
    heroes$!: Observable<Hero[]>;

    constructor(private heroService: HeroService) { }

    ngOnInit(): void {
        // [x] map преобразует коллекцию, обрезая её
        this.heroes$ = this.heroService
            .getHeroes()
            .pipe(map(heroes => heroes.slice(1, 5)));
    }
}
