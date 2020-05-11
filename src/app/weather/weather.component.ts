import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  @Input() url: string;
  @Input() height: string;
  title = "";
  imgsrc = "";
  items = [];
  day = "";
  weather = "";
  icon = "";
  details = [];

  weather_icons = ["bolt", "cloud", "cloud-moon-rain",
      "cloud-rain", "cloud-showers-heavy", "cloud-sun",
      "cloud-sun-rain", "moon", "rainbow", "smog",
      "snowflake", "sun", "wind"];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadFeed();
  }

  ngOnChanges(changes: SimpleChanges) {
    let changeUrl = changes['url'];
    if(!changeUrl.firstChange){
      this.loadFeed();
    }
  }

  display(item: any){
    this.day = item.day;
    this.weather = item.weather;
    this.details = item.details;
    this.icon = item.icon;
  }

  // Naive algorithm to find the best icon for the weather.
  findIcon(weather: string){
    weather = weather.toLowerCase();
    var max_probability = 0;
    var bestIcon = "";
    this.weather_icons.forEach((icon)=>{
      var values = icon.split("-");
      // console.log(values);
      var match = 0;
      values.forEach((value)=>{
        if(weather.includes(value)){
          match++;
        }
      })
      var probability = match/values.length;

      if(probability > max_probability){
        max_probability = probability;
        bestIcon = icon;
      }
    });
    return "fa-"+bestIcon;
  }

  loadFeed(){
    this.apiService.getFeedContent(this.url).subscribe((data: any[])=>{ 
      this.title = data["feed"].title;
      this.imgsrc = data["feed"].image;
      data["items"].forEach((item)=> {
        var formatted_item = {};
        var title = item.title.split(",");
        var summary = title[0].split(":");
        formatted_item["day"] = summary[0];
        formatted_item["weather"] = summary[1];
        formatted_item["icon"] = this.findIcon(summary[1]);
        formatted_item["info"] = [];
        for(var i=1; i < title.length; i++){
          formatted_item["info"].push(title[i]);
        }
        formatted_item["details"] = item.description.split(",");
        this.items.push(formatted_item);
      });
      // console.log(JSON.stringify(data));
      // this.apiService.post("/data",data).subscribe((res: any[])=>{  
      //   console.log(res);
      // })  
    });
  }

}
