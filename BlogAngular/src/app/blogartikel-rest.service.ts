import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { artikel } from './artikel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Injectable({
  providedIn: 'root',
})
export class BlogartikelRestService {
  baseUrl = 'http://localhost:3000/artikels';
  constructor(private http: HttpClient) {}
  getArtikels(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getArtikel(id: string): Observable<any> {
    return this.http.get(this.baseUrl + '/' + id);
  }
  editArtikel(article:artikel):Observable<void>{
    return this.http.put<any>(`http://localhost:3000/artikels/${article.id}`, article, httpOptions);
  }
  deleteArtikel(id: string):Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/artikels/${id}`, httpOptions);
  }
  createArtikel(artikel:artikel): Observable<artikel>{
    return this.http.post<any>(`http://localhost:3000/artikels`, artikel, httpOptions);
  }
}
