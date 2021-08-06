import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
