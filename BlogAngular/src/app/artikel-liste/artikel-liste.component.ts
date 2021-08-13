import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { artikel } from '../artikel';
import { ArtikelService } from '../artikel.service';

@Component({
  selector: 'app-artikel-liste',
  templateUrl: './artikel-liste.component.html',
  styleUrls: ['./artikel-liste.component.css'],
})
export class ArtikelListeComponent implements OnInit {
  constructor(
    private service: ArtikelService,
    private activatedRoute: ActivatedRoute
  ) {}
  artikels: artikel[] = [];
  ngOnInit(): void {
    let tagName = this.activatedRoute.snapshot.queryParamMap.get('tag');
    let suchwort = this.activatedRoute.snapshot.queryParamMap.get('suchwort');
    if (tagName) {
      this.artikels = this.service.getByTag(tagName);
    } else if(suchwort){
      this.artikels = this.service.getBySuchwort(suchwort);
    }
    else this.artikels = this.service.getAll();
  }
}
