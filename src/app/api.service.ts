import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Feed} from './feed';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = "http://localhost:3000";

  private rssToJsonServiceBaseUrl: string = 'https://rss2json.com/api.json?rss_url=';
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getFeedContent(url: string){
    return this.httpClient.get(this.rssToJsonServiceBaseUrl + url);
  }

  // private extractFeeds(res: Response): Feed {
  //   let feed = res.json();
  //   return feed || { };
  // }

  public get(url){  
		return this.httpClient.get(this.SERVER_URL+url);//.pipe(catchError(this.handleError));  
  }

  public post(url, data){  
		return this.httpClient.post(this.SERVER_URL+url, data, this.options);//.pipe(catchError(this.handleError));  
  }
  
  
}
