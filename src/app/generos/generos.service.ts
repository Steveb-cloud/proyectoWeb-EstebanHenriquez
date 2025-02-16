import { inject, Injectable } from '@angular/core';
import { GeneroDTO, GenerosCreacionDTO } from './generos';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { construirQueryParams } from '../compartidos/componentes/funciones/construirQueryParams';
import { paginacionDTO } from '../compartidos/modelos/paginacionDTO';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {
   private http = inject(HttpClient);
   private urlBase="http://apicodersnet.runasp.net/api/Generos";
  constructor() { }
  public obtenerGenerosPaginacion(paginacion: paginacionDTO): 
                                  Observable<HttpResponse<GeneroDTO[]>>{
    let queryparams = construirQueryParams(paginacion);
    return this.http.get<GeneroDTO[]>(`${this.urlBase}`
      ,{params:queryparams, observe:'response'}
    );
  }
  public eliminarGeneros(generoId: number){
    return this.http.delete(`${this.urlBase}/${generoId}`);
  }
  public crearGeneros(genero: GenerosCreacionDTO){
    return this.http.post(this.urlBase,genero);
  }
  public ObtenerGeneroPorId(generoId: number):Observable<GeneroDTO>{
    return this.http.get<GeneroDTO>(`${this.urlBase}/${generoId}`);
  }
  public actualizarGeneros(generoId:number,genero: GenerosCreacionDTO){
    return this.http.put(`${this.urlBase}/${generoId}`,genero)
  }

  

}
