import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {ReservaService} from "../../../service/reserva.service";
import {Reserva} from "../../../model/reserva";

@Component({
  selector: 'app-observacion',
  templateUrl: './observacion.component.html',
  styleUrls: ['./observacion.component.css']
})
export class ObservacionComponent implements OnInit {

  observacion!: string | null;
  flagAsistio!: string | null;
  asistencia= [['S','Asistió'], ['N','No asistió']];


  constructor(
    public dialogRef: MatDialogRef<ObservacionComponent>,
    private httpService: ReservaService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public idReserva: number
  ) { }

  ngOnInit(): void {
    this.getReserva();
  }

  getReserva(){
    this.httpService.getById(this.idReserva).subscribe({
      next:(e)=>{
        this.flagAsistio = e.flagAsistio;
        this.observacion = e.observacion;
        console.log(e);
      },
      error:(err)=>{
        console.log(err)
        this.toastr.error('No se pudo obtener la reserva', 'Error')
      }
    })
  }

  guardar(){
    if(this.flagAsistio!= null && this.observacion!= null){
      this.actualizarReserva();
    }else{
      this.toastr.error('Debe completar todos los campos')
    }
  }

  actualizarReserva(){

    const r = {
      "idReserva": this.idReserva,
      "observacion": this.observacion,
      "flagAsistio": this.flagAsistio
    }
    this.httpService.agregarObservacion(r).subscribe({
      next:(e)=>{
        this.toastr.success('Reserva actualizada');
        this.salir();
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error('No se pudo actualizar la reserva', 'Error');
      }
    });
  }

  salir(){
    this.dialogRef.close();
  }
}
