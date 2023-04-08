import { Component } from '@angular/core';
import { count } from 'rxjs';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent
{
  imageList: string[] = [];
  imagePath: string;
  countImage: number;

  boxArt: string[] = ['../assets/images/box-art/box-blue.jpg', '../assets/images/box-art/box-red.jpg', '../assets/images/box-art/box-green.jpg', '../assets/images/box-art/box-yellow.jpg'];

  constructor()
  {
    this.countImage = 0;
    this.imageList = this.boxArt;
    this.imagePath = this.imageList[this.countImage];
  }


  avanti()
  {
    if (this.countImage  == this.imageList.length-1)
      this.countImage = 0;
    else
      this.countImage++;
    
    this.imagePath = this.imageList[this.countImage];
  }


  indietro()
  {
    if (this.countImage  == 0)
      this.countImage = this.imageList.length-1;
    else
      this.countImage--;
    
    this.imagePath = this.imageList[this.countImage];
  }
}
