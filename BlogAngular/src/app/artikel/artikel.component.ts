import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  artikelCompact: boolean = false;
  constructor(
    private service: ArtikelService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    if (!this.artikel) {
      let compact = this.activatedRoute.snapshot.queryParamMap.get('display');
      console.log(compact);
      if (compact === 'compact') this.artikelCompact = true;
      if (compact === 'full') this.artikelCompact = false;
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        let artikelById = this.service.getById(id);
        if (artikelById) this.artikel = artikelById;
        else this.artikelNotGefunden = true;
      }
    }
  }
}
