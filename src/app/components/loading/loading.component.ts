import { UtilitarioService } from './../../service/utilitario.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {

  /** es la subscripción del service loading */
  private subscription: Subscription;

  /** bandera para la visualizacion del loading */
  private showLoader: boolean;

  /**
   * Constructor de la clase que soporta los eventos del loading del app
   * 
   * @param service, servicio utilitario para obtener la suscription del loading
   */
  constructor(private service: UtilitarioService) { }

  /**
   * Inicializa el componente una vez Angular haya mostrado las propiedades
   */
  ngOnInit() {
    // se obtiene la suscripcion del loading
    this.obtenerSuscripcionLoading();
  }

  /**
   * Se debe eliminar las subscripciones realizadas por el componente
   */
  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Metodo que permite obtener la suscripcion del loading
   */
  private obtenerSuscripcionLoading(): void {
    this.subscription = this.service.loadingBehavior.subscribe(
      (val: boolean) => {
        this.showLoader = val;
      }
    );
  }
}