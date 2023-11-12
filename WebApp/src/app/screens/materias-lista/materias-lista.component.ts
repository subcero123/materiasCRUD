import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { MateriasService } from 'src/app/services/materias.service';
import { Location } from '@angular/common';
import { EliminarMateriaComponent } from 'src/app/modals/eliminar-materia/eliminar-materia.component';

@Component({
  selector: 'app-materias-lista',
  templateUrl: './materias-lista.component.html',
  styleUrls: ['./materias-lista.component.scss']
})
export class MateriasListaComponent {
  public token : string = "";

  public lista_materias: any[] = [];

  displayedColumns: string[] = ['nrc', 'nombre', 'seccion', 'dias', 'hora_inicial', 'hora_final', 'salon', 'programa_educativo','editar', 'eliminar'];
  dataSource = new MatTableDataSource<DatosMateria>(this.lista_materias as DatosMateria[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  

  constructor(
    private facadeService: FacadeService,
    private materiasService: MateriasService,
    private router: Router,
    private location: Location,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);
    
    if(this.token == ""){
      this.router.navigate([""]);
    }
    //Mandar a ejecutar la función
    this.obtenerMaterias();

    //Para paginador
    this.initPaginator();
  }

  //Para paginacion
  //Paginador para Agentes
  public initPaginator(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      //console.log("Paginator: ", this.dataSourceIngresos.paginator);
      //Modificar etiquetas del paginador a español
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    },500);
    //this.dataSourceIngresos.paginator = this.paginator;
  }

  public obtenerMaterias(){
    this.materiasService.obtenerListaMaterias().subscribe(
      (response)=>{
        this.lista_materias = response;
        console.log("Lista materias: ", this.lista_materias);
        if(this.lista_materias.length > 0){
          //Agregar datos 
          this.dataSource = new MatTableDataSource<DatosMateria>(this.lista_materias as DatosMateria[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de materias")
      }
    )
  }

  public goBack(){
    this.location.back();
  }

  //Funcion para editar
  public goEditar(idMateria: number){
    this.router.navigate(["materias-registro/"+idMateria]);
  }

  public goRegistrar(){
    this.router.navigate(["materias-registro"]);
  }

  public goLista(){
    this.router.navigate(["materias-lista"]);
  }

  //Función para eliminar
  public delete(idMateria: number){
    const dialogRef = this.dialog.open(EliminarMateriaComponent,{
      data: {id: idMateria}, //Se pasan valores a través del componente
      height: '268px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Materia eliminada");
        //Recargar página
        window.location.reload();
      }else{
        console.log("No se eliminó la materia");
      }
    });
  }

}//Aquí cierra la clase principal
export interface DatosMateria {
  id: number,
  nrc: number;
  nombre_materia: string;
  seccion: number;
  dias: string;
  hora_inicio: string,
  hora_final: string,
  salon: string,
  programa_educativo: string,

}