import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SmallCardComponent } from './small-card/small-card.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { CoolCardComponent } from './cool-card/cool-card.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SliderComponent } from './slider/slider.component';
import { BigCardComponent } from './big-card/big-card.component';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { InfoPokemonComponent } from './info-pokemon/info-pokemon.component';

@NgModule({
  declarations: [
    AppComponent,
    SmallCardComponent,
    CardContainerComponent,
    CoolCardComponent,
    NavbarComponent,
    LoginComponent,
    SliderComponent,
    BigCardComponent,
    FooterComponent,
    AboutUsComponent,
    InfoPokemonComponent
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
