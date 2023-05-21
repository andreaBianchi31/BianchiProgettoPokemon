import { Component, EventEmitter, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-info-pokemon',
  templateUrl: './info-pokemon.component.html',
  styleUrls: ['./info-pokemon.component.css']
})
export class InfoPokemonComponent
{
  constructor(private title: Title)
  {
  }


  ngOnInit()
  {
    this.title.setTitle('Pokédex | What is a Pokémon?');
  }
}
