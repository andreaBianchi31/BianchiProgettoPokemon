import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaxiContainerComponent } from './maxi-container/maxi-container.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { InfoPokemonComponent } from './info-pokemon/info-pokemon.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component: MaxiContainerComponent},
  {path: 'home', component: MaxiContainerComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'what-is-a-pokemon', component: InfoPokemonComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
