import { Component, OnInit , Input } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-feed-content',
  templateUrl: './feed-content.component.html',
  styleUrls: ['./feed-content.component.scss']
})


export class FeedContentComponent implements OnInit {

  @Input() url: string;
  title = "";
  imgsrc = "";
  items = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // this.apiService.getFeedContent(this.url).subscribe((data: any[])=>{ 
    //   this.title = data["feed"].title;
    //   this.imgsrc = data["feed"].image;
    //   this.items = data["items"];
    //   // console.log(data["feed"]);
    //   // console.log(data["items"]);
    //   // this.apiService.post("/data",data).subscribe((res: any[])=>{  
    //   //   console.log(res);
    //   // })  
    // })
    
    this.apiService.get("/data").subscribe((data: any[])=>{  
      // var elements = $filter('filter')(data["feed"],{url: this.url});
      const urlVal = this.url;
      var result = {};
      data.filter(function(value){
        if(value.feed.url===urlVal){
          result = value;
        }
      });
      this.title = result["feed"].title;
      this.imgsrc = result["feed"].image;
      this.items = result["items"];
      
		})
  }

}