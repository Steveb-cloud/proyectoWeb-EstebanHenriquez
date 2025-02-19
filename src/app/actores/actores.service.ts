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
  
  public crearActor(actor: ActorCreacionDTO){
    const formData = new FormData();
    // Añadir los datos al FormData
  formData.append('nombre', actor.nombre);
  formData.append('fechaNacimiento', actor.fechaNacimiento.toISOString().split('T')[0]); // Enviar la fecha en el formato correcto (yyyy-MM-dd)
  if (actor.foto) {
    formData.append('foto', actor.foto, actor.foto.name); // Asegúrate de enviar el archivo correctamente
  }
       return this.http.post(this.urlBase,formData);
  }

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

  public actualizarActor(actorId: number, actor: ActorCreacionDTO) {
    return this.http.put(`${this.urlBase}/${actorId}`, actor);
  }

  public eliminarActor(actorId: number) {
    return this.http.delete(`${this.urlBase}/${actorId}`);
  }
}

