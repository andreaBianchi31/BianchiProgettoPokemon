import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { PokedexService } from '../common/pokedex.service';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css']
})
export class TipoComponent
{
  @Input() tipo: string = 'bird';
  immagineTipo: string = this.pokedex.typeNormal;
  typeStyle: string = '';

  constructor(private pokedex: PokedexService)
  {
    this.updateStyle(this.tipo);
  }


  ngOnChanges(changes: SimpleChanges)
  {
    this.updateStyle(changes['tipo'].currentValue);
  }


  updateStyle(tipo: string)
  {
    switch(tipo)
    {
      case 'bug': this.typeStyle = 'bg-lime-200 border-lime-400'; break;
      case 'dark': this.typeStyle = 'bg-slate-400 border-slate-600'; break;
      case 'dragon': this.typeStyle = 'bg-blue-200 border-blue-400'; break;
      case 'electric': this.typeStyle = 'bg-yellow-200 border-yellow-400'; break;
      case 'fairy': this.typeStyle = 'bg-fuchsia-200 border-fuchsia-400'; break;
      case 'fighting': this.typeStyle = 'bg-amber-700 border-orange-950'; break;
      case 'fire': this.typeStyle = 'bg-red-200 border-red-400'; break;
      case 'flying': this.typeStyle = 'bg-sky-200 border-sky-400'; break;
      case 'ghost': this.typeStyle = 'bg-violet-300 border-violet-500'; break;
      case 'grass': this.typeStyle = 'bg-green-200 border-green-400'; break;
      case 'ground': this.typeStyle = 'bg-amber-600 border-amber-900'; break;
      case 'ice': this.typeStyle = 'bg-cyan-200 border-cyan-400'; break;
      case 'normal': this.typeStyle = 'bg-slate-200 border-slate-400'; break;
      case 'poison': this.typeStyle = 'bg-purple-200 border-purple-400'; break;
      case 'psychic': this.typeStyle = 'bg-pink-200 border-pink-400'; break;
      case 'rock': this.typeStyle = 'bg-yellow-700 border-yellow-900'; break;
      case 'steel': this.typeStyle = 'bg-slate-400 border-slate-600'; break;
      case 'water': this.typeStyle = 'bg-sky-400 border-sky-600'; break;
      case 'bird': 
      default: this.typeStyle = 'bg-emerald-400 border-fuchsia-600'; break;
    }
  }
}
