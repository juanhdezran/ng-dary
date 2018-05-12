import { Component, OnInit, Input } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() frames: any[];
  @Input() totalFrames: number;
  constructor() { }

  ngOnInit() {
    this.frames.forEach(element => {
      console.log(element);
      if(element['checked'] === true)
        this.totalFrames += element['price'];
    });
  }

  sendInfo(){
    console.log('Se envió un email con la info del cliente ...');
  }

}
