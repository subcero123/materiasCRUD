import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FacadeService } from './facade.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService,
  ) { }

  public esquemaMaterias(){
    return{
      'nrc' : '',
      'nombre_materia' : '',
      "seccion": '',
      'dias' : '',
      'hora_inicial' : '',
      'hora_final' : '',
      'salon' : '',
      'programa_educativo' : '',
    }
  }

  public validarMaterias(data: any, editar: boolean){
    console.log("Validando producto... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["nrc"])){
      error["nrc"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["nrc"])){
      alert("El formato del nrc es solo números");
    }

    if(!this.validatorService.required(data["nombre_materia"])){
      error["nombre_materia"] = this.errorService.required;
    }else if(!this.validatorService.max(data["nombre_materia"], 20)){
      error["nombre_materia"] = this.errorService.max(20);
      alert("La longitud de caracteres del nombre es mayor, deben ser menos de 20");
    }

    if(!this.validatorService.required(data["seccion"])){
      error["seccion"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["seccion"])){
      alert("El formato de la seccion es solo números");
    }

    if(!this.validatorService.required(data["dias"])){
      error["dias"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["hora_inicial"])){
      error["hora_inicial"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["hora_final"])){
      error["hora_final"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["salon"])){
      error["salon"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["programa_educativo"])){
      error["programa_educativo"] = this.errorService.required;
    }

    return error;
  }

    //servicio para registrar un nuevo usuario

    public registrarMateria (data: any): Observable <any>{
      var token = this.facadeService.getSessionToken();
      var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
      return this.http.post<any>(`${environment.url_api}/materias/`,data, {headers:headers});
    }
  
    public obtenerListaMaterias (): Observable <any>{
      var token = this.facadeService.getSessionToken();
      var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
      return this.http.get<any>(`${environment.url_api}/materias/`, {headers:headers});
    }
  
    //Obtener solo un usuario de acuerdo a su ID
    public getMateriaByID(idMateria: Number){
      var token = this.facadeService.getSessionToken();
      var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
      return this.http.get<any>(`${environment.url_api}/materias-edit/?id=${idMateria}`, {headers:headers});
    }
  
    public editarMateria (data: any): Observable <any>{
      var token = this.facadeService.getSessionToken();
      var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
      return this.http.put<any>(`${environment.url_api}/materias-edit/`, data, {headers:headers});
    }

    public eliminarMateria(idMateria: number): Observable <any>{
      var token = this.facadeService.getSessionToken();
      var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
      return this.http.delete<any>(`${environment.url_api}/materias-edit/?id=${idMateria}`,{headers:headers});
    }
}
