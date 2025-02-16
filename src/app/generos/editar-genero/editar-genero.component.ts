import { Component, inject, Inject, Input, numberAttribute, OnInit } from '@angular/core';
import { FormularioGeneroComponent } from "../formulario-genero/formulario-genero.component";
import { GeneroDTO, GenerosCreacionDTO } from '../generos';
import { GenerosService } from '../generos.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-genero',
  imports: [FormularioGeneroComponent],
  templateUrl: './editar-genero.component.html',
  styleUrl: './editar-genero.component.css'
})
export class EditarGeneroComponent implements OnInit{

  ngOnInit(): void {
    this.obtenerGeneroPorId();
  }

  @Input({transform: numberAttribute})
  id! : number;
  genero?: GeneroDTO;
  generoService= inject(GenerosService);
  router = inject(Router);

  guardarCambios(genero: GenerosCreacionDTO){
     this.generoService.actualizarGeneros(this.id,genero).subscribe({
      next: ()=>{
        this.router.navigate(['/generos']);
      },
      error: (error:HttpErrorResponse)=>{
        console.log(error);
      }
     });
   }

   obtenerGeneroPorId(){
      this.generoService.ObtenerGeneroPorId(this.id).subscribe((genero)=>{
        console.log(genero);
        this.genero=genero;
      });
   }



 

}
