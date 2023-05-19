import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-info-pokemon',
  templateUrl: './info-pokemon.component.html',
  styleUrls: ['./info-pokemon.component.css']
})
export class InfoPokemonComponent
{
  @Output() changeNavbar = new EventEmitter<string>();

  ngOnInit()
  {
    this.changeSelection();
  }

  changeSelection()
  {
    this.changeNavbar.emit('pokemon-info');
  }
}
