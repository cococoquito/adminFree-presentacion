import { UtilitarioService } from './../../../b-service/z-common/utilitario.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';

/**
 * Componente para el modal de loading cuando se hace una peticion asyncrona
 */
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {

  /** Es la subscripción del service loading */
  private subscription: Subscription;

  /** Bandera para la visualizacion del loading */
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
  ngOnInit(): void {
    // se obtiene la suscripcion del loading
    this.obtenerSuscripcionLoading();
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
   * Metodo que permite obtener la suscripcion del loading
   */
  private obtenerSuscripcionLoading(): void {
    this.subscription = this.service.behaviorLoading.subscribe(
      (val: boolean) => {
        this.showLoader = val;
      }
    );
  }
}