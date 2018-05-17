import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FramesService } from '../../api/services/frames.service';
import { Frame } from '../../api/models/frames';
import { DetailFrame } from '../../api/models/detail.frame';
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
  frameSelected: Frame;

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

  onFrameCheck(obj){    
    this.frameSelected.detail[obj.index].checked = obj.checked 
    this.frames = this.frames.map(f => {
      if(f.model === this.frameSelected.model){
        f.checked = true;
        f.detail[obj.index].checked = obj.checked;        
        f.checked = false;
        f.detail.forEach(element => {
          if(element.checked === true){
            f.checked = true;
          }
        });
        console.log(f);
      }      
      return f;

    });
    this.calculateTotal();  
  }

  onValueChange(obj){    
    if(obj.index == undefined){
      return;
    }
    this.frames = this.frames.map(f => {
      if(f.model === this.frameSelected.model){                
        f.detail[obj.index].quantity = (obj.quantity === "")? 1 : obj.quantity;
      }      
      return f;
    });
    this.calculateTotal();
  }

  unCheck(frm: Frame, width: number, height: number): void{
    this.frames = this.frames.map(f => {
      if(f.model === frm.model){
        f.detail.forEach((element, index) => {
          if(element.width == width && element.height == height){
            f.detail[index].checked = false;
            f.detail[index].quantity = 1;
          }
        });
        f.checked = false;
        f.detail.forEach(element => {
          if(element.checked === true){
            f.checked = true;
          }
        });                
      }
      return f;
    });
    this.calculateTotal();
  }

  calculateTotal(){
    this.total = 0;
    this.frames.forEach(e => {
      if(e.checked){
        e.detail.forEach(d => {
          if(d.checked){
            this.total += (d.price * d.quantity);            
          }
        });        
      }      
    });    
  }

  private extractData(res: any){    
    this.frames = JSON.parse(res['_body'] || '');
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

  showDetail(frm){
    this.frameSelected = frm;    
    setTimeout(() =>{$("#modal-detail").modal('show');}, 500);    
  }

}
