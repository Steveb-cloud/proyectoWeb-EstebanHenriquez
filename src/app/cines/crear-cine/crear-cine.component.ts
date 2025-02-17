import { Component, inject } from '@angular/core';
import { MapaComponent } from "../../compartidos/componentes/mapa/mapa.component";
import { CineCreacionDTO } from '../cines';
import { FormularioCinesComponent } from "../formulario-cines/formulario-cines.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CinesService } from '../cines.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-crear-cine',
  imports: [FormularioCinesComponent],
  templateUrl: './crear-cine.component.html',
  styleUrl: './crear-cine.component.css'
})
export class CrearCineComponent {
  router = inject(Router);
  cinesService = inject(CinesService);
  private _snackBar = inject(MatSnackBar);

  guardarCambios(cine: CineCreacionDTO) {
    console.log('Creando cine', cine);
    this.cinesService.crearCine(cine).subscribe({
      next: (cine) => {
        this.router.navigate(['/cines']);
        this.openSnackBar("Se guardó con éxito el registro del cine");
      },
      error: (error: HttpErrorResponse) => {
        if (error.error === 404) {
          this.openSnackBar("El cine no fue encontrado");
        } else {
          this.openSnackBar('Ocurrió un error desconocido');
        }
      }
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 4 * 1000,
    });
  }
}

