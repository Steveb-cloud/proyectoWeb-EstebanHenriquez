import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ListadoGenericoComponent } from '../../compartidos/componentes/listado-generico/listado-generico.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-listado-peliculas',
    imports: [CommonModule,MatButtonModule, ListadoGenericoComponent,MatIconModule,MatButtonModule],
    templateUrl: './listado-peliculas.component.html',
    styleUrl: './listado-peliculas.component.css'
})
export class ListadoPeliculasComponent {

  @Input({required: true}) listadPeliculas: any=[];

  /*agregarPelicula(){
    this.listadPeliculas.push({
      titulo: 'Piratas del caribe 8',
      fechaLanzamiento: new Date('2029-03-02'),
      precio: 147.62,
      poster: ''
    });
  }*/

  /*removerPelicula(pelicula: any){
    const indice = this.listadPeliculas.findIndex((peliculaActual:any)=> peliculaActual.titulo === pelicula.titulo);
    this.listadPeliculas.splice(indice,1);
  }*/

}
