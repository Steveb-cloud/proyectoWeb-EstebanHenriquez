import { Component, Input, numberAttribute } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas';
import { FormularioPeliculasComponent } from "../formulario-peliculas/formulario-peliculas.component";

@Component({
  selector: 'app-editar-pelicula',
  imports: [FormularioPeliculasComponent],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css'
})
export class EditarPeliculaComponent {
  @Input({transform: numberAttribute})
  id! : number;

  pelicula: PeliculaDTO= {id:1, titulo: 'Spiden-Man', trailer:'ABC', fechaLanzamiento: new Date('2018-07-25'), poster:'https://upload.wikimedia.org/wikipedia/commons/5/52/Spider-Man.jpg'}

  guardarCambios(pelicula: PeliculaCreacionDTO){
    console.log('Editando Pelicula',pelicula);
  }
}
