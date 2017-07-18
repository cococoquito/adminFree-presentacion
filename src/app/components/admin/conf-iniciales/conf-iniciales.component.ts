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

  constructor() { }

  /**
   * Metodo que permite inicializar las variables del component
   */
  ngOnInit(): void {
  }

  /**
   * Metodo que permite visualizar la parametrizacion para tipos de viviendas
   */
  private showTiposVivienda(): void {
    this.tiposViviendasB = true;
    this.tiposVehiculosB = false;
    this.tiposCuentasB = false;
    this.mensualidadViviendasB = false;
    this.mensualidadVehiculosB = false;
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
