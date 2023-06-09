import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaxiContainerComponent } from './maxi-container/maxi-container.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { InfoPokemonComponent } from './info-pokemon/info-pokemon.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'pokedex', component: MainPageComponent, children: [
      {path: 'home', component: MaxiContainerComponent},
      {path: 'about-us', component: AboutUsComponent},
      {path: 'about-me', redirectTo: '/pokedex/about-us'},
      {path: 'what-is-a-pokemon', component: InfoPokemonComponent},
      {path: 'pokemon-info', redirectTo: '/pokedex/what-is-a-pokemon'},
      {path: 'info-pokemon', redirectTo: '/pokedex/what-is-a-pokemon'},
    ]},
  {path: 'login', component: LoginComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
