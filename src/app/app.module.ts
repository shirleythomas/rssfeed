import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FeedContentComponent } from './feed-content/feed-content.component';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { SettingsComponent } from './settings/settings.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { WeatherComponent } from './weather/weather.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    FeedContentComponent,
    SettingsComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
