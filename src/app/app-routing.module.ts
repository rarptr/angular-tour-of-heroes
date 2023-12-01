import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from 'src/dashboard/dashboard/dashboard.component';

// [ ] 13:50 Использовать LazyLoading. Разбить приложение на модули [dashboard / heroes].
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full', },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
