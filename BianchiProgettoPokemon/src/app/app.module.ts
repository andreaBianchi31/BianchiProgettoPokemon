import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SmallCardComponent } from './small-card/small-card.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { BigCardComponent } from './big-card/big-card.component';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { InfoPokemonComponent } from './info-pokemon/info-pokemon.component';
import { MiniCardComponent } from './mini-card/mini-card.component';
import { MaxiContainerComponent } from './maxi-container/maxi-container.component';
import { DescriptionSliderComponent } from './description-slider/description-slider.component';
import { TipoComponent } from './tipo/tipo.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SmallCardComponent,
    CardContainerComponent,
    NavbarComponent,
    LoginComponent,
    BigCardComponent,
    FooterComponent,
    AboutUsComponent,
    InfoPokemonComponent,
    MiniCardComponent,
    MaxiContainerComponent,
    DescriptionSliderComponent,
    TipoComponent,
    MainPageComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
