import { ParametrizacionRegistrosComponent } from './../parametrizacion-registros.component';
import { STYLE_SUCCESS_CENTER, ITEM_REGISTRADO_EXITOSAMENTE, EXITOSO_ITEM_ELIMINADO } from './../../../../z-util/Constants';
import { CommonVO } from './../../../../c-model/a-admin/parametrizacion/CommonVO';
import { ConfirmationService } from 'primeng/primeng';
import { AlertService } from './../../../../b-service/z-common/alert.service';
import { AdministradorService } from './../../../../b-service/a-admin/administrador.service';
import { UtilitarioService } from './../../../../b-service/z-common/utilitario.service';
import { ComponentCommon } from './../../../../z-util/Component-common';
import { ModuloDTO } from './../../../../c-model/a-admin/seguridad/ModuloDTO';
import { ModuloItemDTO } from './../../../../c-model/a-admin/seguridad/ModuloItemDTO';
import { Component, OnInit, Input } from '@angular/core';

/**
 * Componente para las parametrizaciones iniciales de los registros comunes,
 * son los registros que tienen solamente (ID, NOMBRE)
 */
@Component({
    selector: 'pa-common-items',
    templateUrl: './pa-common-items.component.html'
})
export class PaCommonItemsComponent extends ComponentCommon implements OnInit {

    /** Constantes para los identificadores de los items del menu parametrico */
    private CORRESPONDENCIA_ITEM3: number = 3;

    /** Es el item seleccionado por el usuario*/
    @Input()
    public item: ModuloItemDTO;

    /** Es el modulo del item seleccionado por el usuario*/
    @Input()
    public modulo: ModuloDTO;

    /** Lista de items parametrizados en el sistema, estos se visualiza en la tabla*/
    private items: Array<CommonVO>;

    /** nombre del item al momento de su creacion*/
    private nombre: string;

    /** representa el nombre del item, funcionario, ciudad, solicutud etc*/
    private nombreItem: string;

    /**
    * Constructor del componente para la administracion de registros comunes
    *
    * @param utilService, service con las funciones utilitarias
    * @param alertService, service para la comunicacion del componente de mensaje de alerta
    * @param confirmationService, servicio para la visualizacion del modal de confirmacion
    * @param administradorService, contiene los servicios administrativo
    */
    constructor(
        protected utilService: UtilitarioService,
        protected alertService: AlertService,
        private confirmationService: ConfirmationService,
        private administradorService: AdministradorService) {
        super(utilService, alertService);
    }

    /**
     * PostConstructor que permite inicializar las variables del component
     */
    ngOnInit(): void {

        // se procede a consultar los items parametricos asociado al item seleccionado
        this.listarItemsParametricos();

        // se configura el nombre del item
        this.configurarNombreItem();
    }

    /**
     * Metodo que permite obtener los items parametricos asociados al item seleccionado
     */
    private listarItemsParametricos(): void {

        // se muestra el modal de carga
        this.utilService.displayLoading(true);

        // se invoca el servicio para obtener los items parametricos asociados a su ID
        this.administradorService.getItemsParametricos(this.item.idItem).subscribe(
            data => {
                // se construye los ITEMS consultados
                this.items = data.json();

                // se cierra el modal de carga
                this.utilService.displayLoading(false);
            },
            error => {
                this.showErrorSistema(error);
            }
        );
    }

    /**
     * Metodo que respalda el evento del boton Agregar 
     */
    private insertarItemParametrico(): void {

        // se muestra el modal de carga
        this.utilService.displayLoading(true);

        // se indica que el usuario no ha dado submit
        this.submitted = false;

        // se eliminan los espacios en blanco del nombre ingresado
        this.nombre = this.nombre.trim();

        // se procede a insertar el item en el sistema
        this.administradorService.insertarItemParametrico(this.nombre, this.item.idItem).subscribe(
            data => {
                // se construye los ITEMS que retorna el servicio
                this.items = data.json();

                // se muestra el mensaje exitoso en pantalla
                let msj = ITEM_REGISTRADO_EXITOSAMENTE.replace("?1", this.nombreItem).replace("?2", this.nombre);
                this.alertService.showAlert(msj, STYLE_SUCCESS_CENTER, false);

                // se limpia la variable del nombre del item
                this.nombre = null;

                // se cierra el modal de carga
                this.utilService.displayLoading(false);
            },
            error => {
                this.showErrorSistema(error);
            }
        );
    }

    /**
     *  Metodo que respalda el evento del boton Eliminar 
     */
    private eliminarItemParametrico(registro: CommonVO): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se indica que el usuario no ha dado submit
        this.submitted = false;        

        // se procede abrir la ventana de confirmacion
        this.confirmationService.confirm({
            message: '¿Está seguro de que desea eliminar el siguiente ' + this.nombreItem + '? <br/><strong>' + registro.nombre + '</strong>',
            header: 'Confirmación',
            icon: 'fa fa-trash',
            accept: () => {

                // se muestra el modal de carga
                this.utilService.displayLoading(true);

                // susbripcion para la eliminacion del Registro
                this.administradorService.eliminarItemParametrico(registro.id, this.item.idItem).subscribe(
                    data => {
                        // se construye los ITEMS que retorna el servicio
                        this.items = data.json();

                        // se muestra el mensaje exitoso en pantalla
                        let msj = EXITOSO_ITEM_ELIMINADO.replace("?1", this.nombreItem).replace("?2", registro.nombre);
                        this.alertService.showAlert(msj, STYLE_SUCCESS_CENTER, false);

                        // se cierra el modal de carga
                        this.utilService.displayLoading(false);
                    },
                    error => {
                        this.showErrorSistema(error);
                    }
                );
            }
        });
    }

    /**
     * Metodo que configura el nombre de la entidad para el item seleccionado
     */
    private configurarNombreItem(): void {
        if (this.item.idItem == this.CORRESPONDENCIA_ITEM3) {
            this.nombreItem = "funcionario";
        }
    }
}