import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.css']
})
export class MyChartComponent
{
  @Input() hp: number = 0;
  @Input() attack: number = 0;
  @Input() defense: number = 0;
  @Input() specialAttack: number = 0;
  @Input() specialDefense: number = 0;
  @Input() speed: number = 0;

  @Input() stats: number[] = [];

  myChart: Chart = new Chart("myChart",
  {
    type: 'radar',
    data: {
        labels: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'],
        datasets: [{
            label: 'Stats',
            data: [this.hp, this.attack, this.defense, this.specialAttack, this.specialDefense, this.speed],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            //borderWidth: 1
        }],
    },
    options: {
    },
  });

  constructor()
  {
  }


  ngOnInit()
  {
    console.log([this.hp, this.attack, this.defense, this.specialAttack, this.specialDefense, this.speed]);

    this.myChart = new Chart("myChart",
    {
      type: 'radar',
      data: {
          labels: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'],
          datasets: [{
              label: 'Stats',
              data: [this.hp, this.attack, this.defense, this.specialAttack, this.specialDefense, this.speed],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              //borderWidth: 1
          }],
      },
      options: {
      },
    });
  }


  ngOnChanges(changes: SimpleChanges)
  {
    //console.log(changes);

    this.hp = changes['hp'].currentValue;
    this.attack = changes['attack'].currentValue;
    this.defense = changes['defense'].currentValue;
    this.specialAttack = changes['specialAttack'].currentValue;
    this.specialDefense = changes['specialDefense'].currentValue;
    this.speed = changes['speed'].currentValue;

    this.updateChartData();
  }


  updateChartData()
  {
    console.log(this.myChart);
    this.myChart.data.datasets[0].data = [this.hp, this.attack, this.defense, this.specialAttack, this.specialDefense, this.speed];
    this.myChart.update();
  }

}
