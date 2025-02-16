import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { toBase64 } from '../../toBase64';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-input-img',
  imports: [MatButtonModule],
  templateUrl: './input-img.component.html',
  styleUrl: './input-img.component.css'
})
export class InputImgComponent {

  @Input({required:true})
  titulo!: string;

  @Input()
  urlImagenActual?: string;
  
  imagenBase64?: string;
  
  @Output()
  archivoSeleccionado = new EventEmitter<File>(); 
  
  cambio(event: Event){
  const input = event.target as HTMLInputElement;
  
  if(input.files && input.files.length > 0){
    const file: File = input.files[0];
 
    toBase64(file).then((valor: string) => this.imagenBase64 = valor)
    .catch(error => console.log(error));
    
    this.archivoSeleccionado.emit(file);
    this.urlImagenActual = undefined;
  }
  }

}
