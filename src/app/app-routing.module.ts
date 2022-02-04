import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AboutComponent } from './about/about.component';
//import { ExcelMappingComponent } from './excel-mapping/excel-mapping.component';


const routes: Routes = [
   //{ path: '', component: ExcelMappingComponent },
   //{ path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
