import { AlertService } from './../../../b-service/z-common/alert.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

/**
 * Componente para visualizar Alert exitoso o error dentro de la app
 */
@Component({
  selector: 'alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit, OnDestroy {

  /** Mensaje a mostrar en el componente de alerta*/
  private message: any;

  /** es la subscripción del service alert */
  private subscription: Subscription;

  /**
   * Contructor del component alert
   * @param alertService, service para la comunicacion de los demas componentes
   */
  constructor(private alertService: AlertService) { }

  /**
   * Inicializa el componente una vez Angular haya mostrado las propiedades
   */
  ngOnInit(): void {
    // se obtiene la susbricion del alert service
    this.getSubscribeAlertService();
  }

  /**
   * Se debe eliminar las subscripciones realizadas por el componente
   */
  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Metodo que permite obtener la susbricion del alert service
   */
  private getSubscribeAlertService(): void {
    this.subscription = this.alertService.getMessage().subscribe(
      message => {
        this.message = message;
      });
  }
}