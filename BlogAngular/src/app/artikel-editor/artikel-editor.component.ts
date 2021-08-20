import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { artikel } from '../artikel';
import { ArtikelService } from '../artikel.service';
import { BlogartikelRestService } from '../blogartikel-rest.service';

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
    private service: BlogartikelRestService
  ) {}

  ngOnInit(): void {
    let currentId = this.activatedRoute.snapshot.paramMap.get('id');

    if (currentId) {
      this.service.getArtikel(currentId).subscribe(result => {
        this.artikel = result;
      });
    } else {
      this.artikel = {};
      console.log(typeof this.artikel);
    }
  }

  back() {
    this.router.navigate(['/']);
  }
  publish() {
    this.service.editArtikel(this.artikel)
    .subscribe();
    ;
    this.back();
  }
}
