import { Component, OnInit } from '@angular/core';
import { ListadoPeliculasComponent } from "../peliculas/listado-peliculas/listado-peliculas.component";

@Component({
  selector: 'app-landing-page',
  imports: [ListadoPeliculasComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{
  title = 'proyectoWeb';
  peliculasEnCine!: any[];
  peliculasEnEstreno!: any[];

   ngOnInit(): void {

    setTimeout(() => {
      this.peliculasEnCine =[
        {
          titulo: 'Moana 2',
          fechaLanzamiento: new Date('2023-07-06'),
          precio: 5.30,
          poster: 'https://upload.wikimedia.org/wikipedia/en/7/73/Moana_2_poster.jpg'
        },
        {
          titulo: 'Lilo y Stich',
          fechaLanzamiento: new Date('2024-08-06'),
          precio: 9.30,
          poster: 'https://upload.wikimedia.org/wikipedia/en/b/b5/Liloandstitch2dvd.jpg'
        },
        {
          titulo: 'Bad Boy',
          fechaLanzamiento: new Date('2020-04-06'),
          precio: 174.30,
          poster: 'https://upload.wikimedia.org/wikipedia/en/9/90/Bad_Boys_for_Life_poster.jpg'
        }
      ]

      this.peliculasEnEstreno=[
        {
          titulo: 'Hercules',
          fechaLanzamiento: new Date('2019-03-06'),
          precio: 214.30,
          poster: 'https://upload.wikimedia.org/wikipedia/en/9/90/Bad_Boys_for_Life_poster.jpg'
        },
        {
          titulo: 'Avatar',
          fechaLanzamiento: new Date('2028-06-06'),
          precio: 140.30,
          poster: 'https://upload.wikimedia.org/wikipedia/en/5/54/Avatar_The_Way_of_Water_poster.jpg'
        },
        {
          titulo: 'Avengers',
          fechaLanzamiento: new Date('2028-01-06'),
          precio: 15.30,
          poster: 'https://upload.wikimedia.org/wikipedia/en/4/4d/Avengers_Infinity_War_poster.jpg'
        }
      ]

    }, 2000);

   }


   procesarVoto(voto:number){
    alert(`Calificación otortgados: ${voto}`);
   }



}
