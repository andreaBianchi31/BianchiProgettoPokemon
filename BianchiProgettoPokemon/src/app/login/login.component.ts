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

  usersUrl: string = '../app/common/users.json';

  constructor(private pokedex: PokedexService, private httpAssistant: HttpClient)
  {
  }


  login()
  {
    /*this.httpAssistant.get(this.usersUrl).subscribe(
      (data: any) => {
        let trovato = false;
        for (let index = 0; index < data.length && !trovato; index++)
        {
          if (data[index].username == this.username && data[index].password == this.password)
          {
            trovato = true;
          }
        }

        if (trovato)
        {
          this.pokedex.setValidato(true);
        }
        else
        {
          this.pokedex.setValidato(false);
        }
      },
      (error: any) => {
        console.log('Error => reading users.');
      }
    );*/

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
