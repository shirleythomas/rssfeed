import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  types = ["weather","podcast","news","others"];

  @Input() card: object;

  constructor() { }

  ngOnInit(): void {
  }

  load_feed(e) {
      var changedUrl = e.target.value.toLowerCase();
      this.types.forEach((value)=>{
        if(changedUrl.includes(value)){
          this.card.type = value;
          return;
        }
      })
  }
}
