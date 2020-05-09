import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  layout = [];
	constructor(private apiService: ApiService) { }
	ngOnInit() {
		this.apiService.get("/layout").subscribe((data: any[])=>{  
      this.layout = data;
		})  
  }
  
  toggle(card: any) {
    card.hidden = !card.hidden;
  }

  save(){
    console.log(this.layout);
    this.apiService.post("/layout",this.layout).subscribe((res: any[])=>{  
      console.log(res);
		})  
  }

}
