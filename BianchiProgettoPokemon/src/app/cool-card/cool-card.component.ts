import { Component } from '@angular/core';

@Component({
  selector: 'app-cool-card',
  templateUrl: './cool-card.component.html',
  styleUrls: ['./cool-card.component.css']
})
export class CoolCardComponent
{
  title: string;
  text: string;
  imagePath: string;
  buttonText: string;
  buttonLink: string;

  constructor()
  {
    this.title = 'Titolo';
    this.text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a velit vitae nunc gravida vestibulum eu at mi. Aenean nec dui vitae lectus gravida volutpat a at diam. Suspendisse nisl dolor, ornare vitae erat non, hendrerit ultricies neque. Quisque iaculis tempor mauris sit amet dignissim. Aenean varius sagittis pretium. Cras aliquam est porttitor tempus interdum. Fusce congue egestas bibendum. Quisque ac leo sit amet turpis euismod vestibulum.';
    this.imagePath = 'https://c4.wallpaperflare.com/wallpaper/448/174/357/neon-4k-hd-best-for-desktop-wallpaper-preview.jpg';
    this.buttonText = 'Bottone';
    this.buttonLink = 'https://www.marconirovereto.it/';
  }
}
