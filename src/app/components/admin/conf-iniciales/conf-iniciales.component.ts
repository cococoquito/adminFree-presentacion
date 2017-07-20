import { TIPOS_VIVIENDAS, ESTADO_ACTIVO } from './../../../util/Constants';
import { CommonDTO } from './../../../model/CommonDTO';
import { AlertService } from './../../../service/alert.service';
import { UtilitarioService } from './../../../service/utilitario.service';
import { AdminFreeService } from './../../../service/admin-free.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

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

  /** es el item agregar o editar */
  private itemAgregarEditar: CommonDTO;

  /** inidica que tipo de registro el usuario va parametrizar */
  private tipoRegistro: number;

  /** bandera que identifica si ya se hizo submit */
  private submitted: boolean;

  /**
   * Constructor del componente para las configuraciones iniciales del sistema
   * @param adminFreeService , contienen los servicios especificos de adminFree
   * @param utilService , service con las funciones utilitarias
   * @param alertService , service para la comunicacion del el mensaje de alerta
   * @param confirmationService, servicio para la visualizacion del modal de confirmacion
   */
  constructor(
    private adminFreeService: AdminFreeService,
    private utilService: UtilitarioService,
    private alertService: AlertService,
    private confirmationService: ConfirmationService) { }

  /**
   * Metodo que permite inicializar las variables del component
   */
  ngOnInit(): void { }

  /**
   * Metodo que permite establecer que el user ya hizo submitted
   */
  private onSubmit(): boolean {
    this.alertService.hiddenAlert();
    this.submitted = true;
    return this.submitted;
  }

  /**
   * Metodo que permite visualizar la parametrizacion para tipos de viviendas
   */
  private showTiposVivienda(): void {

    // solo aplica si no se ha dado click con anterioridad
    if (!this.tiposViviendasB) {

      // se inicia como si el user no hay dado commit
      this.submitted = false;

      // inidica que tipo de registro es, se utiliza para guardar, editar, eliminar
      this.tipoRegistro = TIPOS_VIVIENDAS;

      // es el item para agregar o editar, se utiliza tambien para listar las viviendas
      this.itemAgregarEditar = new CommonDTO();
      this.itemAgregarEditar.tipoRegistro = this.tipoRegistro;
      this.itemAgregarEditar.estado = ESTADO_ACTIVO;

      // se muestra el modal de carga
      this.utilService.displayLoading(true);

      // se habilita el tab tipos de viviendas
      this.tiposViviendasB = true;
      this.tiposVehiculosB = false;
      this.tiposCuentasB = false;
      this.mensualidadViviendasB = false;
      this.mensualidadVehiculosB = false;

      // son los items a mostrar por pantalla
      this.items = new Array<CommonDTO>();

      // se procede a listar los tipos de vivienda
      this.adminFreeService.listarItems(this.itemAgregarEditar).subscribe(
        data => {
          // se configuran los tipos de viviendas retornados
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

  /**
   * Metodo que permite soportar el evento del boton guardar
   */
  private guardarItem(): void {
    if (this.itemAgregarEditar) {

      this.itemAgregarEditar.tipoRegistro = this.tipoRegistro;
      // son los items a mostrar por pantalla
      this.items = new Array<CommonDTO>();

      if (!this.itemAgregarEditar.id) {

        // se procede a listar los tipos de vivienda
        this.adminFreeService.agregarItem(this.itemAgregarEditar).subscribe(
          data => {
            // se configuran los tipos de viviendas retornados
            this.items = data.json().result;

            this.alertService.showAlert(data.json().mensaje, "alert alert-success text_center", false);

            // se cierra el modal de carga
            this.utilService.displayLoading(false);

            // se inicia como si el user no hay dado commit
            this.submitted = false;
          },
          error => {
            // se muestra el mensaje alert danger
            this.alertService.showAlert(error.json().mensaje, "alert alert-danger text_center", false);

            // se cierra el modal de carga
            this.utilService.displayLoading(false);
          }
        )

      } else {
        // se procede a listar los tipos de vivienda
        this.adminFreeService.editarItem(this.itemAgregarEditar).subscribe(
          data => {
            // se configuran los tipos de viviendas retornados
            this.items = data.json().result;

            this.alertService.showAlert(data.json().mensaje, "alert alert-success text_center", false);

            // se cierra el modal de carga
            this.utilService.displayLoading(false);

            // se inicia como si el user no hay dado commit
            this.submitted = false;
          },
          error => {
            // se muestra el mensaje alert danger
            this.alertService.showAlert(error.json().mensaje, "alert alert-danger text_center", false);

            // se cierra el modal de carga
            this.utilService.displayLoading(false);
          }
        )
      }
    }

    this.itemAgregarEditar = new CommonDTO();
    this.itemAgregarEditar.tipoRegistro = this.tipoRegistro;
    this.itemAgregarEditar.estado = ESTADO_ACTIVO;
  }

  private eliminarItem(item: CommonDTO): void {

    // se procede abrir la ventana de confirmacion
    this.confirmationService.confirm({
      message: '¿Desea eliminar el registro ' + item.nombre + '?',
      header: 'Confirmación',
      icon: 'fa fa-question-circle',
      accept: () => {

        // se muestra el modal de carga
        this.utilService.displayLoading(true);

        // susbripcion para la eliminacion de paciente
        this.adminFreeService.eliminarItem(item).subscribe(
          data => {
            // se configuran los tipos de viviendas retornados
            this.items = data.json().result;

            this.alertService.showAlert(data.json().mensaje, "alert alert-success text_center", false);

            // se cierra el modal de carga
            this.utilService.displayLoading(false);

            // se inicia como si el user no hay dado commit
            this.submitted = false;
          },
          error => {
            // se muestra el mensaje alert danger
            this.alertService.showAlert(error.json().mensaje, "alert alert-danger text_center", false);

            // se cierra el modal de carga
            this.utilService.displayLoading(false);
          }
        );
      }
    });
  }

  private rowSelected(data): void {


    this.itemAgregarEditar = new CommonDTO();
    this.itemAgregarEditar.tipoRegistro = this.tipoRegistro;
    this.itemAgregarEditar.estado = ESTADO_ACTIVO;
    this.itemAgregarEditar.id = data.id;
    this.itemAgregarEditar.nombre = data.nombre;

    console.log(this.itemAgregarEditar);

  }
}