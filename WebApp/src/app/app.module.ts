import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Mask
import {​​ NgxMaskModule, IConfig }​​ from 'ngx-mask';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
//Options mask
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {​​}​​;

//Angular material
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';


import { HttpClientModule } from '@angular/common/http';
import { EliminarUserModalComponent } from './modals/eliminar-user-modal/eliminar-user-modal.component';
import { RegistrarMateriasComponent } from './screens/registrar-materias/registrar-materias.component';
import { MateriasListaComponent } from './screens/materias-lista/materias-lista.component';
import { EliminarMateriaComponent } from './modals/eliminar-materia/eliminar-materia.component';
import { EditarMateriaComponent } from './modals/editar-materia/editar-materia.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    RegistroScreenComponent,
    HomeScreenComponent,
    EliminarUserModalComponent,
    RegistrarMateriasComponent,
    MateriasListaComponent,
    EliminarMateriaComponent,
    EditarMateriaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    NgxMaskModule.forRoot(options),
    MatDialogModule,
    MatSelectModule,
    NgxMaterialTimepickerModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
