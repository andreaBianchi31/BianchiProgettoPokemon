import { Component, Input } from '@angular/core';
import { PokedexService } from '../common/pokedex.service';
import { Pokemon } from '../common/pokemon';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css']
})
export class SmallCardComponent
{
  @Input() pokemon: Pokemon;

  constructor(pokedex: PokedexService)
  {

  }

  
}
