import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { artikel } from '../artikel';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  suchwort:string ="";
  @Input() artikels?: artikel[];
  TagMap:Map<string, number> = new Map<string, number>();
  ngOnInit(): void {
    if (this.artikels) 
    this.TagMap = this.createTagCloud(this.artikels);

  }
  createTagCloud(artikels: artikel[]): Map<string, number> {
    // Alle Artikel durchgehen und alle Tags aufsammeln. Für die Schriftgrößen
    // benötigen wir für jedes Tag die Anzahl des Vorkommens über alle Artikel.
    // Je häufiger ein Tag vorkommt, desto größer soll es dargestellt werden.
    // Als Speicher für diese Daten bietet sich eine Map an, ein Objekt, das
    // Schlüssel-/Wert-Paare enthält. Die Schlüssel sind die Tags und die Werte
    // sind deren Häufigkeiten: {Tag1: Anzahl1, Tag2: Anzahl2, ...}
    // leeres Objekt anlegen
    var tagMap = new Map();

    // größte Häufigkeit eines Tags
    var max = 1;
    // Alle Artikel durchlaufen
    for (var article of artikels) {
      var a = article;

      // Alle Tags des Artikels durchlaufen
      for (var j = 0; j < a.tags.length; j++) {
        var tag = a.tags[j];
        // Testen, ob das Tag schon in der Map ist
        if (!(tagMap.has(tag))) {
          // Nein, taucht zum ersten Mal auf
          // --> mit Anzahl 1 in die Map schreiben
          tagMap.set(tag, 1);
        } else {
          // war schon da, Anzahl erhöhen
          let currentVal = tagMap.get(tag);
          currentVal++;
          tagMap.set(tag, currentVal);
          // Maximum ggf. anpassen
          if (tagMap.get(tag) > max) {
            max = tagMap.get(tag);
          }
        }
      }
    }
    return tagMap;
  }
  sucheStarten(){
    let suchwort:HTMLInputElement = document.getElementById("searchquery") as HTMLInputElement;
    this.suchwort = suchwort.value;
    if(suchwort.value){
      let queryParams = {suchwort:suchwort.value}
      this.router.navigate(
        ['/artikels'], 
        {
          relativeTo: this.activatedRoute,
          queryParams: queryParams, 
          queryParamsHandling: 'merge', // remove to replace all query params by provided
        });
    }
  }
}
