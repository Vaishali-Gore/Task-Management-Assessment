import { Component, OnInit } from '@angular/core';
import { Cards } from '../../card.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ListsCardsService } from '../../lists-cards.service';
import { Lists } from '../../lists.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ThemeService } from '../../theme.service';



@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  lists: Lists[] = [];
  cards: Cards[] = [];
  createListForm: FormGroup;
  createCardForm: FormGroup;
  validInput = "/^(\s+\S+\s*)*(?!\s).*$/";

  constructor(private fb: FormBuilder, private fbr: FormBuilder,
    private listsCards: ListsCardsService,
    private themeService: ThemeService) { }

  ngOnInit(): void {
    this.createListForm = this.fb.group({
      name: new FormControl("", [Validators.required,
        Validators.pattern(this.validInput)])
    });
    this.createCardForm = this.fbr.group({
      cardName: new FormControl("", [Validators.required,
      Validators.pattern(this.validInput)])
    })
    this.listsCards.getLists().subscribe((data)=>{
      this.lists = [...data];
      
    })
  }

  get name() { return this.createListForm.get('name'); }
  get cardname() { return this.createCardForm.get('cardName'); }

  isFormValid() : boolean {
    return this.createListForm.disabled ? true : this.createListForm.valid
  }

  //Create new list

  createnewList(){
    const newList: Lists = {
      name: this.createListForm.get("name").value
    }
    
   this.listsCards.createList(newList).subscribe(
     data=>{
       alert("List created successfully");
       this.lists.push(newList);
     },error=>{
       alert("There is problem with the server, can't add list");
     }
   )
    
   this.createListForm.reset();
  }

  //Create New Card
  createCard(i: number){
    const newCard: Cards ={
      cardName: this.createCardForm.get("cardName").value
    }
    for(let k=0; k<this.lists.length; k++){
      if(i == k){
        this.lists[i].cards.push(newCard);
      }
      this.createCardForm.reset();

    }
   
   /* this.listsCards.createCards(i, newCard).subscribe(data=>{
      for(let k=0; k<=this.lists$.length; k++){
        if(i == k){
          this.cards.push(i);
        }
      }
    })*/
  }
  //delete card from Ui
  deleteCard(id:number){
    for(let k=0; k<=this.lists.length; k++){
      if(id == k){
        this.lists[k].cards.splice(id-1, 1);
        console.log(id);   
      }
  }
}
  

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  toggleTheme() {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }
  }

}
