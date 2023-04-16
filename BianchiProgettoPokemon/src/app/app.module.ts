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

@NgModule({
  declarations: [
    AppComponent,
    SmallCardComponent,
    CardContainerComponent,
    CoolCardComponent,
    NavbarComponent,
    LoginComponent,
    SliderComponent,
    BigCardComponent
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
