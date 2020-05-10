import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-feed-content',
  templateUrl: './feed-content.component.html',
  styleUrls: ['./feed-content.component.scss']
})


export class FeedContentComponent implements OnInit {

  @Input() url: string;
  @Input() height: string;
  title = "";
  imgsrc = "";
  items = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadFeed();
  }

  ngOnChanges(changes: SimpleChanges) {
    let changeUrl = changes['url'];
    if(!changeUrl.firstChange){
      // console.log(123);
      // console.log(changeUrl.currentValue);
      this.loadFeed();
    }
  }

  openWindow(url: string){
    window.open(url, "_blank");
  }

  loadFeed(){
    // this.apiService.getFeedContent(this.url).subscribe((data: any[])=>{ 
    //   this.title = data["feed"].title;
    //   this.imgsrc = data["feed"].image;
    //   this.items = data["items"].sort((val1, val2)=> {return new Date(val2.pubDate) - new Date(val1.pubDate)});;
    //   console.log(data["feed"]);
    //   console.log(data["items"]);
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
          console.log(result);
        }
      });
      this.title = result["feed"].title;
      this.imgsrc = result["feed"].image;
      this.items = result["items"].sort((val1, val2)=> {return new Date(val2.pubDate) - new Date(val1.pubDate)});
		})
  }

}