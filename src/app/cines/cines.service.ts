import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CineDTO } from './cines';
import { Observable } from 'rxjs';
import { construirQueryParams } from '../compartidos/componentes/funciones/construirQueryParams';
import { paginacionDTO } from '../compartidos/modelos/paginacionDTO';

@Injectable({
  providedIn: 'root'
})
export class CinesService {
  private http = inject(HttpClient);
  private urlBase = "http://apicodersnet.runasp.net/api/cines";

  constructor() { }

  public obtenerCinesPaginacion(paginacion: paginacionDTO): Observable<HttpResponse<CineDTO[]>> {
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<CineDTO[]>(this.urlBase, { params: queryParams, observe: 'response' });
  }

  public obtenerCines(): Observable<CineDTO[]> {
    return this.http.get<CineDTO[]>(this.urlBase);
  }

  public eliminarCine(cineId: number) {
    return this.http.delete(`${this.urlBase}/${cineId}`);
  }

}

