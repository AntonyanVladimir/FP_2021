import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { artikel } from '../artikel';
import { ArtikelService } from '../artikel.service';

@Component({
  selector: 'app-artikel-editor',
  templateUrl: './artikel-editor.component.html',
  styleUrls: ['./artikel-editor.component.css'],
})
export class ArtikelEditorComponent implements OnInit {
  artikel: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ArtikelService
  ) {}

  ngOnInit(): void {
    let currentId = this.activatedRoute.snapshot.paramMap.get('id');

    if (currentId) {
      let artFromService = this.service.getById(currentId);
      if (artFromService) {
        this.artikel = artFromService;
      }
    } else {
      this.artikel = {};
      console.log(typeof this.artikel);
    }
  }

  back() {
    this.router.navigate(['/']);
  }
  publish() {
    console.log(this.artikel);
    this.service.publishArtikel(this.artikel);
    this.back();
  }
}
