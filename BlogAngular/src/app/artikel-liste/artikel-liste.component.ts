import { Component, OnInit } from '@angular/core';
import { artikel } from '../artikel';
import { ArtikelService } from '../artikel.service';

@Component({
  selector: 'app-artikel-liste',
  templateUrl: './artikel-liste.component.html',
  styleUrls: ['./artikel-liste.component.css']
})
export class ArtikelListeComponent implements OnInit {
  constructor(private service:ArtikelService) { }
  artikels:artikel [] = [];  
  ngOnInit(): void {
    this.artikels = this.service.getAll();
  }

}
