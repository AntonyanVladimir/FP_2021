import { Component, Input, OnInit } from '@angular/core';
import { artikel } from '../artikel';

@Component({
  selector: 'app-artikel',
  templateUrl: './artikel.component.html',
  styleUrls: ['./artikel.component.css']
})
export class ArtikelComponent implements OnInit {
  @Input() artikel?:artikel;
  constructor() { }

  ngOnInit(): void {
  }

}
