import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Lists } from './lists.model'

@Injectable({
  providedIn: 'root'
})
export class ListsCardsService {
  private listCardsUrl = "http://localhost:3000/lists/";
  private cardsUrl = "http://localhost:3000/lists/`${id}`/";

  constructor(private http: HttpClient) { }

  getLists(): Observable<Lists[]>{
    return this.http.get<Lists[]>(this.listCardsUrl);

  }

  createCards(id, card): Observable<Lists[]>{
    return this.http.post<Lists[]>(this.listCardsUrl, `${id}.${card}`);

  }
  
  createList(list): Observable<Lists[]>{
    return this.http.post<Lists[]>(this.listCardsUrl, list);
  }


  

}
