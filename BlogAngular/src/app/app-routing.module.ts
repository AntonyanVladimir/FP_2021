import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtikelEditorComponent } from './artikel-editor/artikel-editor.component';
import { ArtikelListeComponent } from './artikel-liste/artikel-liste.component';
import { ArtikelComponent } from './artikel/artikel.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'artikels', component: ArtikelListeComponent },
  { path: 'artikel/:id', component: ArtikelComponent },
  { path: 'artikel-editor/:id', component: ArtikelEditorComponent },
  { path: 'artikel-editor', component: ArtikelEditorComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'kontakt', component: KontaktComponent },
  { path: '', component: ArtikelListeComponent },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
