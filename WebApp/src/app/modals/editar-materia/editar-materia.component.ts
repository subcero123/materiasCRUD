import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MateriasService } from 'src/app/services/materias.service';


@Component({
  selector: 'app-editar-materia',
  templateUrl: './editar-materia.component.html',
  styleUrls: ['./editar-materia.component.scss']
})
export class EditarMateriaComponent {
 //public idUsuario: Number = 0;

 constructor(
  private dialogRef: MatDialogRef<EditarMateriaComponent>,
  public materiasService: MateriasService,
  @Inject (MAT_DIALOG_DATA) public data: any
) { }

ngOnInit(): void {
  console.log("Id user: ", this.data.id);
  
}

public cerrar_modal(){
  this.dialogRef.close({isDelete:false});
}

public editarMateria(){
  this.materiasService.editarMateria(this.data).subscribe(
    (response)=>{
      console.log(response);
      this.dialogRef.close({isDelete:true});
    }, (error)=>{
      this.dialogRef.close({isDelete:false});
    }
  );
}
}
