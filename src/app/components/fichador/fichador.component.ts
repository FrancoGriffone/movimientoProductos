import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as dayjs from 'dayjs'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-fichador',
  templateUrl: './fichador.component.html',
  styleUrls: ['./fichador.component.scss'],

})
export class FichadorComponent {

  prueba: boolean = true

  fecha: String = dayjs().add(1, 'day').format('YYYY-MM-DD')
  fechaBusqueda: any = dayjs().subtract(1, 'year').format('YYYY-MM-DD')

  fechaInicio= new FormControl(this.fechaBusqueda);
  fechaFinal = new FormControl(this.fecha);


  onSubmit(){
    this.prueba = !this.prueba
    if (this.prueba == true){
      Swal.fire({
        title: 'No se encontraron datos',
        text: `Verifique las fechas y el código para poder intentar nuevamente`,
        icon: 'question',
        confirmButtonText: 'Volver atrás'
      })
    } else {
      Swal.fire({
        title: 'Error!',
        text: `No existen movimientos del producto fichado. Verifique las fechas y el código`,
        icon: 'error',
        confirmButtonText: 'Volver atrás'
      })
    }
  }


}
