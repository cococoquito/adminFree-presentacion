import { TIPOS_VIVIENDAS } from './../../../util/Constants';
import { CommonDTO } from './../../../model/CommonDTO';
import { AlertService } from './../../../service/alert.service';
import { UtilitarioService } from './../../../service/utilitario.service';
import { AdminFreeService } from './../../../service/admin-free.service';
import { Component, OnInit } from '@angular/core';

/**
 * Componente para las configuraciones iniciales del sistema
 */
@Component({
  selector: 'app-conf-iniciales',
  templateUrl: './conf-iniciales.component.html',
  styleUrls: ['./conf-iniciales.component.css']
})
export class ConfInicialesComponent implements OnInit {

  /** banderas para la visualizacion de cada configuracion */
  private tiposViviendasB: boolean;
  private tiposVehiculosB: boolean;
  private tiposCuentasB: boolean;
  private mensualidadViviendasB: boolean;
  private mensualidadVehiculosB: boolean;

  /** style para el tab seleccionado */
  private style_tab_selected = {
    'background-color': '#EEEEEE'
  };

  /** style para el tab NO seleccionado */
  private style_tab_not_selected = {
    'cursor': 'pointer'
  };

  /** lista de tipos de configuraciones a visualizar en pantalla */
  private items: Array<CommonDTO>;

  /**
   * Constructor del componente para las configuraciones iniciales del sistema
   * @param adminFreeService , contienen los servicios especificos de adminFree
   * @param utilService , service con las funciones utilitarias
   * @param alertService , service para la comunicacion del el mensaje de alerta
   */
  constructor(
    private adminFreeService: AdminFreeService,
    private utilService: UtilitarioService,
    private alertService: AlertService) { }

  /**
   * Metodo que permite inicializar las variables del component
   */
  ngOnInit(): void {
  }

  /**
   * Metodo que permite visualizar la parametrizacion para tipos de viviendas
   */
  private showTiposVivienda(): void {

    // se muestra el modal de carga
    this.utilService.displayLoading(true);

    this.tiposViviendasB = true;
    this.tiposVehiculosB = false;
    this.tiposCuentasB = false;
    this.mensualidadViviendasB = false;
    this.mensualidadVehiculosB = false;

    this.items = new Array<CommonDTO>();

    let parametro = new CommonDTO();
    parametro.tipoRegistro = TIPOS_VIVIENDAS;

    this.adminFreeService.listarItems(parametro).subscribe(
      data => {
        this.items = data.json();
        // se cierra el modal de carga
        this.utilService.displayLoading(false);
      },
      error => {
        // se muestra el mensaje alert danger
        this.alertService.showAlert(error.json().mensaje, "alert alert-danger text_center", false);

        // se cierra el modal de carga
        this.utilService.displayLoading(false);
      }
    )
  }

  /**
   * Metodo que permite visualizar la parametrizacion para tipos de vehiculos
   */
  private showTiposVehiculos(): void {
    this.tiposViviendasB = false;
    this.tiposVehiculosB = true;
    this.tiposCuentasB = false;
    this.mensualidadViviendasB = false;
    this.mensualidadVehiculosB = false;

  }

  /**
   * Metodo que permite visualizar la parametrizacion para tipos de cuentas
   */
  private showTiposCuentas(): void {
    this.tiposViviendasB = false;
    this.tiposVehiculosB = false;
    this.tiposCuentasB = true;
    this.mensualidadViviendasB = false;
    this.mensualidadVehiculosB = false;
  }

  /**
   * Metodo que permite visualizar la parametrizacion para mensualidad de vivienda
   */
  private showMensualidadVivienda(): void {
    this.tiposViviendasB = false;
    this.tiposVehiculosB = false;
    this.tiposCuentasB = false;
    this.mensualidadViviendasB = true;
    this.mensualidadVehiculosB = false;
  }

  /**
   * Metodo que permite visualizar la parametrizacion para mensualidad de vehiculos
   */
  private showMensualidadVehiculo(): void {
    this.tiposViviendasB = false;
    this.tiposVehiculosB = false;
    this.tiposCuentasB = false;
    this.mensualidadViviendasB = false;
    this.mensualidadVehiculosB = true;
  }
}
