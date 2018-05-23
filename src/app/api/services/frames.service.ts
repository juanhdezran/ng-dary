import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Frame } from '../models/frames';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FramesService {

  csvUrl: string = '../../../assets/storage/db.json';
  data: Frame[] = [];
  constructor(private http: Http) { }

  getCsvData() {
    return this.http.get(this.csvUrl);
  }

  sendMail(data){
    console.log(data);
    return this.http.post('http://localhost/mail.php', data).subscribe((response: Response) => {
      console.log(response);
    })
  }

}
