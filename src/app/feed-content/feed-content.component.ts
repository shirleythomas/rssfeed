import { Component, OnInit, Input, SimpleChanges, ElementRef } from '@angular/core';
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
  link ="";
  type = "";
  constructor(private apiService: ApiService,
              private elRef: ElementRef) { }

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

  view(url: string){
    if(this.type === 'video/mp4'){
      this.setVideo(url);
    } else {
      this.openWindow(url);
    }
  }

  openWindow(url: string){
    window.open(url, "_blank");
  }

  setVideo(url: string){
    this.link = url;
    const player = this.elRef.nativeElement.querySelector('video');
    player.load();
  }

  loadFeed(){
    this.apiService.getFeedContent(this.url).subscribe((data: any[])=>{ 
      this.title = data["feed"].title;
      this.imgsrc = data["feed"].image;
      this.items = data["items"].sort((val1, val2)=> {return new Date(val2.pubDate) - new Date(val1.pubDate)});;
      if(this.items[0].enclosure.type === 'video/mp4'){
        this.link = this.items[0].enclosure.link;
      }
      this.type = this.items[0].enclosure.type;
      console.log(data["feed"]);
      console.log(data["items"]);
      // this.apiService.post("/data",data).subscribe((res: any[])=>{  
      //   console.log(res);
      // })  
    })
    
    // this.apiService.get("/data").subscribe((data: any[])=>{  
    //   // var elements = $filter('filter')(data["feed"],{url: this.url});
    //   const urlVal = this.url;
    //   var result = {};
    //   data.filter(function(value){
    //     if(value.feed.url===urlVal){
    //       result = value;
    //       // console.log(result);
    //     }
    //   });
    //   this.title = result["feed"].title;
    //   this.imgsrc = result["feed"].image;
    //   this.items = result["items"].sort((val1, val2)=> {return new Date(val2.pubDate) - new Date(val1.pubDate)});
    //   this.type = this.items[0].enclosure.type;
    //   if(this.items[0].enclosure.type === 'video/mp4'){
    //     this.link = this.items[0].link;
    //   }
		// })
  }

}