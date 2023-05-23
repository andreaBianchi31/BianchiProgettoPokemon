import { Component, EventEmitter, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent
{
  constructor(private title: Title)
  {
  }

  ngOnInit()
  {
    this.title.setTitle('Pokédex | About Me')
  }
}
