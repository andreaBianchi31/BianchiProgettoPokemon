import { Component } from '@angular/core';
import { PokedexService } from '../common/pokedex.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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


  constructor(public pokedex: PokedexService, private httpAssistant: HttpClient, private router: Router, private title: Title)
  {
    this.title.setTitle('Pokédex | Login');
  }


  ngOninit()
  {
    this.title.setTitle('Pokédex | Login');
  }


  login()
  {
    this.httpAssistant.get(this.usersUrl).subscribe (
      (data: any) => {
        //Controlla se esiste un utente con usename e password uguali a quelli inseriti
        let trovato = false;
        for (let index = 0; index < data.length && !trovato; index++)
        {
          if (data[index].username.toUpperCase() == this.username.toUpperCase() && data[index].password == this.password)
          {
            trovato = true;
          }
        }

        // Se username e password sono corretti, setta validato a true e naviga alla home
        if (trovato)
        {
          this.pokedex.setValidato(true);
          this.router.navigate(['/pokedex/home']);
        }
        else // Se username e password NON sono corretti, setta validato a false
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
