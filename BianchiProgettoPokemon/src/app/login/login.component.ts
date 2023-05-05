import { Component } from '@angular/core';
import { PokedexService } from '../common/pokedex.service';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent
{
  pokedexLogo: string = this.pokedex.basePath + '/utility/pokedex-icon.png';
  username: string = '';
  password: string = '';

  constructor(private pokedex: PokedexService, private httpAssistant: HttpClient)
  {

  }

  login()
  {
    //this.httpAssistant.get('./assets')

    if (true)
    {
      this.pokedex.setValidato(true);
    }
    else
    {
      this.pokedex.setValidato(false);
    }
  }

}
