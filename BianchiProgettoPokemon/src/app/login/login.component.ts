import { Component } from '@angular/core';
import { PokedexService } from '../common/pokedex.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

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

  usersUrl: string = './assets/users.json';

  constructor(public pokedex: PokedexService, private httpAssistant: HttpClient, private router: Router)
  {
    console.log(pokedex.getValidato());
  }


  ngOnInit()
  {
    if (this.pokedex.getValidato())
    {
      this.router.navigate(['/pokedex/home']);
    }
  }


  login()
  {
    this.httpAssistant.get(this.usersUrl).subscribe(
      (data: any) => {
        let trovato = false;
        for (let index = 0; index < data.length && !trovato; index++)
        {
          if (data[index].username.toUpperCase() == this.username.toUpperCase() && data[index].password == this.password)
          {
            trovato = true;
          }
        }

        if (trovato)
        {
          this.pokedex.setValidato(true);
          this.router.navigate(['/pokedex']);
          console.log(localStorage.getItem('very-very-sus'));
        }
        else
        {
          this.pokedex.setValidato(false);
        }
      },
      (error: any) => {
        console.log('Error => reading users.');
      }
    );

  }

}
