import { Component, Input } from '@angular/core';
import { SelectorMultipleDTO } from './SelectorMultiples';

@Component({
  selector: 'app-selector-multiple',
  imports: [],
  templateUrl: './selector-multiple.component.html',
  styleUrl: './selector-multiple.component.css'
})
export class SelectorMultipleComponent {

  @Input({required:true})
  Seleccionado!: SelectorMultipleDTO[];

  @Input({required:true})
  NoSeleccionado!: SelectorMultipleDTO[];

  seleccionar(elemento: SelectorMultipleDTO, indice: number){
    this.Seleccionado.push(elemento);
    this.NoSeleccionado.splice(indice,1);
  }

  deseleccionar(elemento: SelectorMultipleDTO,indice: number){
    this.NoSeleccionado.push(elemento);
    this.Seleccionado.splice(indice,1);
  }

  seleccionarTodo(){
    this.Seleccionado.push(...this.NoSeleccionado);
    this.NoSeleccionado.length=0;
  }

  deseleccionarTodo(){
    this.NoSeleccionado.push(...this.Seleccionado);
    this.Seleccionado.length=0;
  }


}
