import { Component, inject } from '@angular/core';
import { FormularioActoresComponent } from "../formulario-actores/formulario-actores.component";
import { ActorCreacionDTO } from '../actores';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActoresService } from '../actores.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-crear-actor',
  imports: [FormularioActoresComponent],
  templateUrl: './crear-actor.component.html',
  styleUrl: './crear-actor.component.css'
})
export class CrearActorComponent {
  router = inject(Router);
  actoresService = inject(ActoresService);
  private _snackBar = inject(MatSnackBar);

  guardarCambios(actor: ActorCreacionDTO) {
    console.log('Creando el actor', actor);
    this.actoresService.crearActor(actor).subscribe((any) =>{
        console.log(any)
    });     //{
      
      /*next: (actor) => {
        this.router.navigate(['/actores']);
        this.openSnackBar("Se guardó con éxito el registro del actor");
      },
      error: (error: HttpErrorResponse) => {
        console.log("est"+error.message)
        if (error.error === 404) {
          this.openSnackBar("El actor no fue encontrado");
        } else {
          this.openSnackBar('Ocurrió un error desconocido');
        }
      }*/
   // });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 4 * 1000,
    });
  }
}
