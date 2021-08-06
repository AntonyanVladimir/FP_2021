import { Component, OnInit } from '@angular/core';
import { artikel } from '../artikel';
import { ArtikelService } from '../artikel.service';

@Component({
  selector: 'app-inhaltsbereich',
  templateUrl: './inhaltsbereich.component.html',
  styleUrls: ['./inhaltsbereich.component.css']
})
export class InhaltsbereichComponent implements OnInit {

  constructor(private service:ArtikelService) { }
  artikels:artikel [] = [];  
  ngOnInit(): void {
    this.artikels = this.service.getAll();
  }

}
