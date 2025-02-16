import { inject, Injectable } from '@angular/core';
import { ActorDTO, ActorCreacionDTO } from './actores';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { construirQueryParams } from '../compartidos/componentes/funciones/construirQueryParams';
import { paginacionDTO } from '../compartidos/modelos/paginacionDTO';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {
  private http = inject(HttpClient);
  private urlBase = "http://apicodersnet.runasp.net/api/actores";

  constructor() {}

  public obtenerActoresPaginacion(paginacion: paginacionDTO): Observable<HttpResponse<ActorDTO[]>> {
    let queryparams = construirQueryParams(paginacion);
    return this.http.get<ActorDTO[]>(`${this.urlBase}`, { params: queryparams, observe: 'response' });
  }

  public obtenerActores(): Observable<ActorDTO[]> {
    return this.http.get<ActorDTO[]>(this.urlBase);
  }

  public obtenerActorPorId(actorId: number): Observable<ActorDTO> {
    return this.http.get<ActorDTO>(`${this.urlBase}/${actorId}`);
  }

  public crearActor(actor: ActorCreacionDTO) {
    return this.http.post(this.urlBase, actor);
  }

  public actualizarActor(actorId: number, actor: ActorCreacionDTO) {
    return this.http.put(`${this.urlBase}/${actorId}`, actor);
  }

  public eliminarActor(actorId: number) {
    return this.http.delete(`${this.urlBase}/${actorId}`);
  }
}

