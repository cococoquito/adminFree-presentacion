import { AlertService } from './../../../service/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {

  /** Mensaje a mostrar en el componente de alerta*/
  private message: any;

  /**
   * Contructor del component alert
   * @param alertService, service para la comunicacion de los demas componentes
   */
  constructor(private alertService: AlertService) { }

  /**
   * Inicializa el componente una vez Angular haya mostrado las propiedades
   */
  ngOnInit() {
    // se obtiene la susbricion del alert service
    this.getSubscribeAlertService();
  }

  /**
   * Metodo que permite obtener la susbricion del alert service
   */
  private getSubscribeAlertService(): void {
    this.alertService.getMessage().subscribe(
      message => {
        this.message = message;
      });
  }
}
