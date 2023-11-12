import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-eliminar-materia',
  templateUrl: './eliminar-materia.component.html',
  styleUrls: ['./eliminar-materia.component.scss']
})
export class EliminarMateriaComponent implements OnInit {
 //public idUsuario: Number = 0;

 constructor(
  private dialogRef: MatDialogRef<EliminarMateriaComponent>,
  public materiasService: MateriasService,
  @Inject (MAT_DIALOG_DATA) public data: any
) { }

ngOnInit(): void {
  console.log("Id user: ", this.data.id);
  
}

public cerrar_modal(){
  this.dialogRef.close({isDelete:false});
}

public eliminarMateria(){
  this.materiasService.eliminarMateria(this.data.id).subscribe(
    (response)=>{
      console.log(response);
      this.dialogRef.close({isDelete:true});
    }, (error)=>{
      this.dialogRef.close({isDelete:false});
    }
  );
}
}
