import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { artikel } from '../artikel';
import { ArtikelService } from '../artikel.service';

@Component({
  selector: 'app-artikel',
  templateUrl: './artikel.component.html',
  styleUrls: ['./artikel.component.css'],
})
export class ArtikelComponent implements OnInit {
  @Input() artikel?: artikel;
  artikelNotGefunden: boolean = false;
  constructor(
    private service: ArtikelService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.artikel) {
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        let artikelById = this.service.getById(id);
        if (artikelById) this.artikel = artikelById;
        else this.artikelNotGefunden = true;
      }
    }
  }
}
