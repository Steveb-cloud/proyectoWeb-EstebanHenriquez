import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ActoresService } from '../actores.service';
import { ActorDTO } from '../actores';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-indice-actores',
  imports: [MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule],
  templateUrl: './indice-actores.component.html',
  styleUrl: './indice-actores.component.css'
})
export class IndiceActoresComponent {
  columnasMostrar: string[] = ['Id', 'Nombre', 'FechaNacimiento', 'Foto', 'Accion'];

  actor = inject(ActoresService);
  listaActor!: ActorDTO[];

  dataSource: any;

  paginacion = { pagina: 1, recordsPorPagina: 5 };
  cantidadTotalRegistros!: number;

  constructor() {
    this.cargarListadoActores();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarListadoActores() {
    this.actor.obtenerActoresPaginacion(this.paginacion).subscribe((respuesta: HttpResponse<ActorDTO[]>) => {
      this.listaActor = respuesta.body as ActorDTO[];
      console.log(this.listaActor);
      const cabecera = respuesta.headers.get("cantidad-total-registros") as string;
      this.cantidadTotalRegistros = parseInt(cabecera, 10);
      this.dataSource = new MatTableDataSource(this.listaActor);
    });
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginacion = { pagina: datos.pageIndex + 1, recordsPorPagina: datos.pageSize };
    this.cargarListadoActores();
  }

  borrar(idUnico: number) {
    console.log("Este es el id a eliminar: " + idUnico);
    Swal.fire({
      title: "¿Está seguro de eliminar este actor?",
      text: "¡Esta acción es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "Sí, quiero eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.actor.eliminarActor(idUnico).subscribe({
          next: () => {
            this.cargarListadoActores();
            Swal.fire({
              title: "¡Se eliminó correctamente!",
              text: "El actor ha sido eliminado.",
              icon: "success"
            });
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 404) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Lo sentimos, ocurrió un error al eliminar el actor: " + error.statusText,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
              });
            }
          }
        });
      }
    });
  }
}

