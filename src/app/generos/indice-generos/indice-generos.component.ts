import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { GenerosService } from '../generos.service';
import { GeneroDTO, GenerosCreacionDTO } from '../generos';
import {MatTableModule} from '@angular/material/table';
import { paginacionDTO } from '../../compartidos/modelos/paginacionDTO';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-indice-generos',
  imports: [MatButtonModule,RouterLink,MatTableModule,MatPaginatorModule],
  templateUrl: './indice-generos.component.html',
  styleUrl: './indice-generos.component.css'
})
export class IndiceGenerosComponent {
  columnasMostrar: string[] = ['Id', 'Nombre', 'Accion'];

  generosService= inject(GenerosService);
  listaGeneros!: GeneroDTO[];

  paginacion:paginacionDTO={pagina:1, recordsPorPagina:5}
  cantidadTotalRegistros!:number;

  constructor(){
    this.cargarListadoGeneros();
  }

  cargarListadoGeneros(){
    this.generosService.obtenerGenerosPaginacion(this.paginacion)
                .subscribe((resppuesta:HttpResponse<GeneroDTO[]>)  =>{
      this.listaGeneros=resppuesta.body as GeneroDTO[];
      console.log(this.listaGeneros);
      const cabecera= resppuesta.headers.get("cantidad-total-registros") as string;
      this.cantidadTotalRegistros=parseInt(cabecera,10)
    });
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginacion ={pagina:datos.pageIndex+1, recordsPorPagina:datos.pageSize}
    this.cargarListadoGeneros();
  }
  
  borrar(idUnico:number){
    console.log("Este es el id a eliminar"+idUnico);
    Swal.fire({
      title: "¿Esta seguro de elimnar este registro?",
      text: "Esta accion es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText:'Cancelar',
      confirmButtonText: "Si, quiero eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.generosService.eliminarGeneros(idUnico).subscribe({
          
          next: (generoEliminar)=>{
          this.cargarListadoGeneros();
            Swal.fire({
              title: "Se elimino correctamente!",
              text: "Your file has been deleted.",
              icon: "success"
            })
          },
          error: (error:HttpErrorResponse)=>{
            if(error.status === 404){
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Lo sentimos ocurrió un error al eliminar el género: "+error.statusText,
              });
            }else{
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
