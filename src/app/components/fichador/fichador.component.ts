import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-fichador',
  templateUrl: './fichador.component.html',
  styleUrls: ['./fichador.component.scss']
})
export class FichadorComponent {

  fecha = new Date()

  subtractDay(date: Date, day: number) {
    date.setDate(date.getDate() - day);
    return date;
  }

  fechaBusqueda: any = this.subtractDay(this.fecha, 1).toISOString().slice(0,-14)

  fechaInicio = new FormControl(this.fechaBusqueda);
  fechaFinal = new FormControl(this.fecha);


}
