import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpressumComponent } from './impressum/impressum.component';
import { InhaltsbereichComponent } from './inhaltsbereich/inhaltsbereich.component';
import { KontaktComponent } from './kontakt/kontakt.component';

const routes: Routes = [
  {path: "artikels", component: InhaltsbereichComponent},
  {path: "impressum", component: ImpressumComponent},
  {path: "kontakt", component: KontaktComponent},
  {path: "", component: InhaltsbereichComponent}
];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
