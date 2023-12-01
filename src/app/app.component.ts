import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    // TODO: как конкретно влияет OnPush
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    title = 'Tour of Heroes';
}
