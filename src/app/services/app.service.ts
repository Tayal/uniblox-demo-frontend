import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions: Object = {
  header: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getItems(): Observable<any> {
    return this.http.get("../../assets/store.json");
  }

  getDiscount(code: string): Observable<any> {
    return this.http.post<any>("http://localhost:3000/discount", {code: code}, httpOptions);
  }

  checkout(cart: any) {
    return this.http.post<any>("http://localhost:3000/cart", cart, httpOptions);
  }
}
