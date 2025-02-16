import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { FormularioGeneroComponent } from "../formulario-genero/formulario-genero.component";
import { GenerosCreacionDTO } from '../generos';
import { GenerosService } from '../generos.service';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-crear-generos',
  imports: [MatButtonModule, FormularioGeneroComponent],
  templateUrl: './crear-generos.component.html',
  styleUrl: './crear-generos.component.css'
})
export class CrearGenerosComponent {
  router = inject(Router);
   generosService= inject(GenerosService);
   private _snackBar = inject(MatSnackBar);

  guardarCambios(genero: GenerosCreacionDTO){
    console.log('Insertar genero', genero);
    this.generosService.crearGeneros(genero).subscribe({
      next: (genero) =>{
         this.router.navigate(['/generos']);
         this.openSnackBar("Se guardo con exito el registro de genero");
      },
      error: (error:HttpErrorResponse) => {
        // Manejar el error 404 aquí
        if (error.error === 404) {
          
          this.openSnackBar("El género no fue encontrado")
        } else {
         this.openSnackBar('Ocurrió un error desconocido');
        }
      }
    });
    //console.log(this.form.value);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "",{
      duration: 4 * 1000,
    });
  }
 

}
