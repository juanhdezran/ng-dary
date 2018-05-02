import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Frame } from '../models/frames';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FramesService {

  csvUrl: string = '../../../assets/storage/db.csv';
  data: Frame[] = [];
  constructor(private http: Http) { }

  getCsvData() {
    return this.http.get(this.csvUrl);
  }

}
