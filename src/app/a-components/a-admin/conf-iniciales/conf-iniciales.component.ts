import { ESTADO_ACTIVO } from './../../../util/Constants';
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

  /** Constantes para identificar el tipo de configuracion a registrar */
  private TIPOS_VIVIENDAS: number = 1;
  private TIPOS_VEHICULOS: number = 2;
  private TIPOS_CUENTAS: number = 3;
  private MENSUALIDAD_VIVIENDA: number = 4;
  private MENSUALIDAD_VEHICULOS: number = 5;

  /** style para el tab seleccionado */
  private style_tab_selected = {
    'background-color': '#EEEEEE'
  };

  /** style para el tab NO seleccionado */
  private style_tab_not_selected = {
    'cursor': 'pointer'
  };

  /** lista de los items a visualizar por pantalla */
  private items: Array<CommonDTO>;

  /** es el item agregar o editar */
  private itemAgregarEditar: CommonDTO;

  /** indica el tipo de configuracion que el user va a registrar */
  private tipoConfiguracion: number;

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
   * Metodo que visualiza el tab para las configuracion de los items del sistema
   * @param tipoConf , indica el tipo de configuracion que el user va registrar
   */
  private showTabConfiguracionItem(tipoConf: number): void {

    // se identifica si este tipo configuracion ya fue seleccionado
    if (tipoConf != this.tipoConfiguracion) {

      // se muestra el modal de carga
      this.utilService.displayLoading(true);

      // se establece el tipo de configuracion
      this.tipoConfiguracion = tipoConf;

      // se reinicia el submmit
      this.submitted = false;

      // es el item para agregar o editar, se utiliza tambien para listar los registros
      this.initItemAgregarEditar();

      // son los items a mostrar por pantalla
      this.items = new Array<CommonDTO>();

      // se procede a listar los registros
      this.adminFreeService.listarItems(this.itemAgregarEditar).subscribe(
        data => {
          // se configuran los registros retornados
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
   * Metodo que permite visualizar la parametrizacion para mensualidad de vivienda
   */
  private showMensualidadVivienda(): void {
    this.tipoConfiguracion = this.MENSUALIDAD_VIVIENDA;
  }

  /**
   * Metodo que permite visualizar la parametrizacion para mensualidad de vehiculos
   */
  private showMensualidadVehiculo(): void {
    this.tipoConfiguracion = this.MENSUALIDAD_VEHICULOS;
  }

  /**
   * Metodo que permite establecer que el user ya hizo submitted
   */
  private onSubmit(): boolean {
    this.submitted = true;
    return this.submitted;
  }

  /**
   * Metodo que permite soportar el evento del boton guardar para los items
   */
  private guardarItem(): void {

    // se valida que si exista un item para agregar o editar
    if (this.itemAgregarEditar) {

      // se define el tipo de registro (VIVIENDA, VEHICULO, CUENTA etc)
      this.itemAgregarEditar.tipoRegistro = this.tipoConfiguracion;

      // se reinicia los items a visualizar
      this.items = new Array<CommonDTO>();

      // si el item no tiene ID es por que es nuevo
      if (!this.itemAgregarEditar.id) {

        // se procede a registrar el item
        this.adminFreeService.agregarItem(this.itemAgregarEditar).subscribe(
          data => {
            // se configuran los items retornados
            this.items = data.json().result;

            // se reinicia el item de agregacion o edicion
            this.initItemAgregarEditar();

            // se reinicia el submmit
            this.submitted = false;

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
      } else {
        // si el item tiene id se procede actualizar su nombre
        this.adminFreeService.editarItem(this.itemAgregarEditar).subscribe(
          data => {
            // se configuran los items retornados
            this.items = data.json().result;

            // se reinicia el item de agregacion o edicion
            this.initItemAgregarEditar();

            // se reinicia el submmit
            this.submitted = false;

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
  }

  /**
   * Metodo que permite eliminar un item seleccionado
   * @param item , datos del item a eliminar
   */
  private eliminarItem(item: CommonDTO): void {

    // se procede abrir la ventana de confirmacion
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar el siguiente registro? <br/> <div class="text_center">' + item.nombre + '</div>',
      header: 'Confirmación',
      icon: 'fa fa-question-circle',
      accept: () => {

        // se muestra el modal de carga
        this.utilService.displayLoading(true);

        // susbripcion para la eliminacion del item
        this.adminFreeService.eliminarItem(item).subscribe(
          data => {
            // se configuran los items retornados
            this.items = data.json().result;

            // se reinicia el submmit
            this.submitted = false;

            // si debe limpiar el item eliminado si fue selecionado por el user
            if (this.itemAgregarEditar.id && item.id == this.itemAgregarEditar.id) {
              this.initItemAgregarEditar();
            }

            // se cierra el modal de carga
            this.utilService.displayLoading(false);
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

  /**
   * Metodo que permite que soportar el evento al momento de seleccionar un item para editar
   * @param data , es el item a editar
   */
  private seleccionarItemEditar(data): void {
    this.initItemAgregarEditar();
    this.itemAgregarEditar.id = data.id;
    this.itemAgregarEditar.nombre = data.nombre;
  }

  /**
   * Metodo que permite inicializar el item de agregacion o edicion
   */
  private initItemAgregarEditar(): void {
    this.itemAgregarEditar = new CommonDTO();
    this.itemAgregarEditar.tipoRegistro = this.tipoConfiguracion;
    this.itemAgregarEditar.estado = ESTADO_ACTIVO;
  }
}