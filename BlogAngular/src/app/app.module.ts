import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KopfzeileComponent } from './kopfzeile/kopfzeile.component';
import { InhaltsbereichComponent } from './inhaltsbereich/inhaltsbereich.component';
import { FusszeileComponent } from './fusszeile/fusszeile.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ArtikelComponent } from './artikel/artikel.component';
import { ArtikelEditorComponent } from './artikel-editor/artikel-editor.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { ArtikelShareComponent } from './artikel-share/artikel-share.component';
import { ArtikelListeComponent } from './artikel-liste/artikel-liste.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component'
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    KopfzeileComponent,
    InhaltsbereichComponent,
    FusszeileComponent,
    SidebarComponent,
    ArtikelComponent,
    ArtikelEditorComponent,
    ImpressumComponent,
    KontaktComponent,
    ArtikelShareComponent,
    ArtikelListeComponent,  
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
