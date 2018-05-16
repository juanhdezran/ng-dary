import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Frame } from '../../api/models/frames';

@Component({
  selector: 'modal-detail',
  templateUrl: './modal-detail.component.html',
  styleUrls: ['./modal-detail.component.css']
})
export class ModalDetailComponent implements OnInit {
  @Input() frame: Frame;
  @Output() action = new EventEmitter();
  constructor() { }

  ngOnInit() {
    console.log(this.frame);
  }

  check(e, index){   
    let obj = {'checked': e, 'index': index}; 
    this.action.emit(obj);
  }

}
