import { TestBed } from '@angular/core/testing';
import { ListsCardsService } from './lists-cards.service';
import { of } from 'rxjs';



describe('ListsCardsService', () => {
  let service: ListsCardsService;
  let mockHttpClient;

  beforeEach(() => {
    service = new ListsCardsService(mockHttpClient);
    
  });

  it('should return List data', ()=>{
    let mockResponce = [
      {
        "id": 1,
        "name": "Todo",
        "cards": [
          {
            "id": 1,
            "cardName": "Pay Electricity bill"
          }
        ]
      }];
      let responce;
      spyOn(service, 'getLists' ).and.returnValue(of(mockResponce));
      service.getLists().subscribe(res =>{responce = res});
    expect(responce).toEqual(mockResponce);
  })
  
  it('should add List data', ()=>{
    let mockResponce = [
      {
        "id": 1,
        "name": "Todo",
        "cards": [
          {
            "id": 1,
            "cardName": "Pay Electricity bill"
          }
        ]
      }];
      let length = mockResponce.length;
      let responce;
      let newlist;
      spyOn(service, 'createList' ).and.returnValue(of(mockResponce));
      service.createList(newlist).subscribe(res =>{responce = res});
    expect(responce.length).toEqual(length);
  })

});
