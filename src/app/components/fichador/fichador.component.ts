import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as dayjs from 'dayjs'
import { ConfirmEventType, ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-fichador',
  templateUrl: './fichador.component.html',
  styleUrls: ['./fichador.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class FichadorComponent {
  position: string = 'center';

  items: MenuItem[] | null; //ITEMS DEL SPEEDDIAL

  cities: City[] | undefined; //ELEMENTOS DEL INPUT CON SEARCH

  selectedCity: City | undefined; //ELEMENTO SELECCIONADO

  visible: boolean = false;

  sidebarVisible2: boolean = false;

  prueba: boolean = true

  // fecha: String = dayjs().add(1, 'day').format('YYYY-MM-DD')
  // fechaBusqueda: any = dayjs().subtract(1, 'year').format('YYYY-MM-DD')
  fecha = dayjs().toDate()
  fechaBusqueda = dayjs().subtract(1, 'year').toDate()

  fechaInicio = new FormControl(this.fechaBusqueda);
  fechaFinal = new FormControl(this.fecha);

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.items = [
      {
        icon: 'pi pi-globe',
        target:'_blank',
        url: 'http://192.168.0.5:8081/',
        tooltipOptions: {
          tooltipLabel: "OMS",
          tooltipPosition: "bottom"
        }
      },
      {
        icon: 'pi pi-tags',
        target:'_blank',
        url: 'http://192.168.0.5:90/productos/webform/rep_listadoproductos.html',
        tooltipOptions: {
          tooltipLabel: "Listado de productos",
          tooltipPosition: "bottom"
        }
      },
      {
        icon: 'pi pi-comments',
        target:'_blank',
        url: 'http://192.168.0.9:4001/#/seccion/3xp3d',
        tooltipOptions: {
          tooltipLabel: "Días francos",
          tooltipPosition: "bottom"
        }
      },
      {
          icon: 'pi pi-search',
          target:'_blank',
          url: 'http://192.168.0.5:90/productos/webform/consultaproductos.html',
          tooltipOptions: {
            tooltipLabel: "Consulta de productos",
            tooltipPosition: "bottom"
        }
      }
    ];
  }

  ngOnInit(): void {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  onSubmit(){
    this.visible = true;
    console.log(this.fechaInicio.value)
    this.prueba = !this.prueba
    if (this.prueba == true){
      // Swal.fire({
      //   title: 'No se encontraron datos',
      //   text: `Verifique las fechas y el código para poder intentar nuevamente.`,
      //   icon: 'question',
      //   confirmButtonText: 'Volver atrás'
      // })
    } else {
      // Swal.fire({
      //   title: '¡Error!',
      //   text: `No existen movimientos del producto fichado. Verifique las fechas y el código.`,
      //   icon: 'error',
      //   confirmButtonText: 'Volver atrás'
      // })
    }
  }

  confirmPosition(position: string) {
    this.position = position;

    this.confirmationService.confirm({
        message: '¿Estás seguro de querer confirmar los datos?',
        header: 'Confirmación de datos',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        rejectLabel: 'No',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: '¡Los datos fueron confirmados con éxito!' });
        },
        reject: (type: ConfirmEventType) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Se denegó la confirmación de datos.' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Acción cancelada', detail: 'Se canceló la acción. Presiona el botón de nuevo si deseas confirmar o no los datos.' });
                    break;
            }
        },
        key: 'positionDialog'
    });
  }
}
