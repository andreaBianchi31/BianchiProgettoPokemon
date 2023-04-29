import { Component, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-description-slider',
  templateUrl: './description-slider.component.html',
  styleUrls: ['./description-slider.component.css']
})
export class DescriptionSliderComponent
{
  @Input() entries: string[] = [];
  index: number = 0;
  entry: string = 'No entry.';


  constructor()
  {
  }


  ngOnChanges(change: SimpleChange)
  {
    this.index = 0;
    this.setEntry();
  }


  avanti()
  {
    if (this.index == this.entries.length-1)
      this.index = 0;
    else
      this.index++;

    this.setEntry();
  }


  indietro()
  {
    if (this.index == 0)
      this.index = this.entries.length-1;
    else
      this.index--;

    this.setEntry();
  }


  setEntry()
  {
    this.entry = this.entries[this.index];
  }
}
