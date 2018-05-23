import { Component, OnInit, Input } from '@angular/core';
import { FramesService } from '../../api/services/frames.service';
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
  nombreCompleto: string = '';
  telefono: string = '';
  email: string = '';
  ciudad: string = '';
  estado: string = '';
  comentarios: string = '';

  constructor(private framesService: FramesService) { }

  ngOnInit() {
    this.frames.forEach(element => {
      if(element['checked'] === true)
        this.totalFrames += element['price'];
    });
  }

  sendInfo(){
    let request = {
      'nombre' : this.nombreCompleto,
      'telefono' : this.telefono,
      'email' : this.email,
      'ciudad' : this.ciudad,
      'estado' : this.estado,
      'comentarios': this.comentarios,
      'marcos' : JSON.stringify(this.frames.filter((frame) => frame.checked))
    }
    this.framesService.sendMail(request);
    console.log('Se envió un email con la info del cliente ...');
  }

  isValid(){
    if(this.nombreCompleto != '' && this.telefono != '' && this.email != '' && this.ciudad != '' && this.estado != '' && this.comentarios != ''){
      return true;
    }
    return false;
  }

}
