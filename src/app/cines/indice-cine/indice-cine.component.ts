import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource} from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { CinesService } from '../cines.service';
import { CineDTO } from '../cines';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { paginacionDTO } from '../../compartidos/modelos/paginacionDTO';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-indice-cine',
  imports: [MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule,MatFormFieldModule, MatInputModule],
  templateUrl: './indice-cine.component.html',
  styleUrl: './indice-cine.component.css'
})
export class IndiceCineComponent {
  columnasMostrar: string[] = ['Id', 'Nombre', 'Accion'];

  cines = inject(CinesService);
  listacines!: CineDTO[];
  

  dataSource : any;

  paginacion: paginacionDTO = { pagina: 1, recordsPorPagina: 5 };
  cantidadTotalRegistros!: number;

  constructor() {
    this.cargarListadoCines();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarListadoCines() {
    this.cines.obtenerCinesPaginacion(this.paginacion)
      .subscribe((respuesta: HttpResponse<CineDTO[]>) => {
        this.listacines = respuesta.body as CineDTO[];
        console.log(this.listacines);
        const cabecera = respuesta.headers.get("cantidad-total-registros") as string;
        this.cantidadTotalRegistros = parseInt(cabecera, 10);
        this.dataSource = new MatTableDataSource(this.listacines);
      });
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginacion = { pagina: datos.pageIndex + 1, recordsPorPagina: datos.pageSize };
    this.cargarListadoCines();
  }

  borrar(id: number) {
    Swal.fire({
      title: "¿Está seguro de eliminar este cine?",
      text: "¡Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cines.eliminarCine(id).subscribe({
          next: () => {
            this.cargarListadoCines();
            Swal.fire({
              title: "¡Eliminado!",
              text: "El cine ha sido eliminado.",
              icon: "success"
            });
          },
          error: (error: HttpErrorResponse) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo eliminar el cine: " + error.message,
            });
          }
        });
      }
    });
  }
}

