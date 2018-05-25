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
    let message = this.framesService.sendMail(request);    
    $('#modal').modal('hide');
    if(message){
      alert('Se ha enviado su cotización, el equipo de Foto Estudio Dary se pondrá en contacto con usted lo antes posible.')
      return;
    }
    alert('Ocurrió un error al enviar su cotización, por favor intentelo de nuevo más tarde.');
  }

  isValid(){
    if(this.nombreCompleto != '' && this.telefono != '' && this.email != '' && this.ciudad != '' && this.estado != '' && this.comentarios != ''){
      return true;
    }
    return false;
  }

}
