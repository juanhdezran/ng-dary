import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FramesService } from '../../api/services/frames.service';
import { Frame } from '../../api/models/frames';
import { CATEGORIES } from '../../api/services/category.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'frames-list',
  templateUrl: './frames-list.component.html',
  styleUrls: ['./frames-list.component.css']
})
export class FramesListComponent implements OnInit {
  frames: Frame[] = [];
  categories = CATEGORIES;
  total: number =0;
  framesChecked: Frame[] = [];

  constructor(private framesService: FramesService) { }  
  ngOnInit() {
    this.getFrames();
    $('.collapse').collapse({
      toggle: false
    });
  }

  getFrames(){
    this.framesService.getCsvData().subscribe(
      data => this.extractData(data),
      err => this.handleError(err)
    );         
  }

  onFrameCheck(e, frm: Frame){
      this.frames = this.frames.map(f => {
        if(f.model === frm.model){
          f.checked = e;
        }
        return f;
      });
    this.calculateTotal();  
  }

  onValueChange(model, quantity){
    quantity = (quantity === "")? 1 : quantity;
    this.frames = this.frames.map(f => {
      if(f.model === model){
        f.quantity = quantity;
      }
      return f;
    });
    this.calculateTotal();
  }

  unCheck(frm: Frame): void{
    this.frames = this.frames.map(f => {
      if(f.model === frm.model){
        f.checked = false;
        f.quantity = 1;
      }
      return f;
    });
    this.calculateTotal();
  }

  calculateTotal(){
    this.total = 0;
    this.frames.forEach(e => {
      if(e.checked){
        this.total += (e.price * e.quantity);
      }      
    });
    console.log(this.total);
  }

  private extractData(res: any){    
    let csvData = res['_body'] || '';
    let allTextLines = csvData.split(/\r\n|\n/);    
    let lines = [];
    lines = allTextLines.map(ln => {
      let line = ln.split(',');
      let frm: Frame = {
        name: line[0],
        model: line[1],
        price: parseInt(line[2]),
        width: parseInt(line[3]),
        height: parseInt(line[4]),
        image: line[5].replace(/\s/g, ""),
        category: parseInt(line[6]),
        quantity: 1,
        checked: false
      };
      return frm;      
    });
    this.frames = lines;
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return errMsg;
  }

  showModal(){
    $('#modal').modal('show');
  }  

}
