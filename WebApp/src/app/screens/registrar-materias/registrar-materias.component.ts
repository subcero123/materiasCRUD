import { Component } from '@angular/core';
import { MateriasService } from 'src/app/services/materias.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';

declare var $:any;
@Component({
  selector: 'app-registrar-materias',
  templateUrl: './registrar-materias.component.html',
  styleUrls: ['./registrar-materias.component.scss']
})
export class RegistrarMateriasComponent {
  //Variables del componente registro
  public editar: boolean = false;
  public materias:any = {};

  public idMateria: Number = 0;
  //Para detectar errores
  public errors:any ={};

  constructor(
    private materiasService: MateriasService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.materias = this.materiasService.esquemaMaterias();
    //Imprimir datos en consola
    //Primer if valida si existe un parametro en la URL
    if (this.activatedRoute.snapshot.params["id"] !== undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idMateria = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idMateria);
      //Al iniciar la vista obtiene el usuario por su ID
      this.obtenerMateriaByID();
    }
    console.log("Materias: ", this.materias);
  }

  public obtenerMateriaByID(){
    this.materiasService.getMateriaByID(this.idMateria).subscribe(
      (response)=>{
        this.materias = response;
        //Agregamos valores faltantes
        console.log("Datos user: ", this.materias);
      }, (error)=>{
        alert("No se pudieron obtener los datos del usuario a editar")
      }
    );
  }

  public regresar(){
    this.location.back();
  }
  

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.materiasService.validarMaterias(this.materias, false);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    this.materiasService.registrarMateria(this.materias).subscribe(
      (response)=>{
        alert("Materia registrada correctamente");
        console.log("Materia registrada: ", response);
        this.router.navigate(["/"]);
      }, (error)=>{
        alert("No se pudo registrar")
      }
    )
  }

  public actualizar(){
    //Validar
    this.errors = []

    this.errors = this.materiasService.validarMaterias(this.materias, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Paso la validacion");
    this.materiasService.editarMateria(this.materias).subscribe(
      (response)=>{
        alert("Materia editada correctamente");
        console.log("Materia editada", response);
        //Si se edito, entonces vamos al home
        this.router.navigate(["home"]);
      }, (error)=>{
        alert("No se pudo editar")
      }
    );
  }
}
