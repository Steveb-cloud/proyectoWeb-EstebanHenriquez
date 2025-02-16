import { Component, Input, numberAttribute } from '@angular/core';
import { CineCreacionDTO, CineDTO } from '../cines';
import { FormularioGeneroComponent } from "../../generos/formulario-genero/formulario-genero.component";
import { FormularioCinesComponent } from "../formulario-cines/formulario-cines.component";

@Component({
  selector: 'app-editar-cines',
  imports: [/*FormularioGeneroComponent,*/ FormularioCinesComponent],
  templateUrl: './editar-cines.component.html',
  styleUrl: './editar-cines.component.css'
})
export class EditarCinesComponent {
  @Input({transform: numberAttribute})
  id! : number;

  cine: CineDTO= {id:1, nombre:'Supercines',latitud: -2.2281682216039735, longitud: -79.89818616150315 }

  guardarCambios(cine: CineCreacionDTO){
    console.log('Editar cine', cine);
    
  }

}
