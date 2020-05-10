import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  layout = [];
  maxId = 0;
  isReadOnly = true;
  deletedIds = [];
  
  constructor(private apiService: ApiService, private router: Router) { }
  
	ngOnInit() {
		this.apiService.get("/layout").subscribe((data: any[])=>{  
      this.layout = data.sort((val1, val2)=> {return val1.order-val2.order});
      this.maxId = Math.max.apply(Math, data.map(function(o) { return o.id; }));
    })
  }
  
  toggle(card: any) {
    card.hidden = !card.hidden;
  }

  save(){
    var order = 0;
    this.layout.forEach((card)=>{
      card.order = order++;
      if(card.newid){
        card.id = card.newid;
        delete card.newid;
        this.apiService.post("/layout",card).subscribe((res: any[])=>{  
          console.log(res);
        });
      }else{
        this.apiService.put("/layout/"+card.id,card).subscribe((res: any[])=>{  
          console.log(res);
        });
      }
    });
    this.deletedIds.forEach((id)=>{
      this.apiService.delete("/layout/"+id).subscribe((res: any[])=>{  
        console.log(res);
      });
    });
    this.deletedIds = [];
  }

  add(){
      var newCard = {
        "newid": ++this.maxId,
        "url": "",
        "hidden": true,
        "rowspan": 4,
        "colspan": 1
      };
      
      this.layout.push( newCard );
  }

  delete(id: any){

    this.deletedIds.push(id);

    var index = this.layout.map(x => {
      return x.id;
    }).indexOf(id);
    
    this.layout.splice(index, 1);
  }

  refresh(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/']);
  }

  toggle_edit(){
    this.isReadOnly = !this.isReadOnly;
  }

  cancel(){
    this.toggle_edit();
    this.layout.forEach(card => {
      card.hidden=false;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.layout, event.previousIndex, event.currentIndex);
  }

}
