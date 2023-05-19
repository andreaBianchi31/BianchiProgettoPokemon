import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent
{
  @Output() changeNavbar = new EventEmitter<string>();

  ngOnInit()
  {
    this.changeSelection();
  }

  changeSelection()
  {
    this.changeNavbar.emit('about-us');
  }
}
