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

    /** Es el item seleccionado por el usuario*/
    @Input()
    public item: ModuloItemDTO;

    /** Es el modulo del item seleccionado por el usuario*/
    @Input()
    public modulo: ModuloDTO;

    /** Lista de items parametrizados en el sistema, estos se visualiza en la tabla*/
    private items: Array<CommonVO>;

    /** se utiliza para crear el item*/
    private itemCrear: CommonVO;

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

        // se inicializa las variables globales
        this.init();
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

        // se indica que el usuario no ha dado commit
        this.submitted = false;

        // se eliminan los espacios en blanco del nombre ingresado
        this.itemCrear.nombre = this.itemCrear.nombre.trim();

        // se procede a insertar el item en el sistema
        this.administradorService.insertarItemParametrico(this.itemCrear).subscribe(
            data => {
                // se construye los ITEMS que retorna el servicio
                this.items = data.json();

                // se muestra el mensaje exitoso en pantalla
                this.alertService.showAlert(ITEM_REGISTRADO_EXITOSAMENTE, STYLE_SUCCESS_CENTER, false);

                // se inicializa las variables globales
                this.init();

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

        // se procede abrir la ventana de confirmacion
        this.confirmationService.confirm({
            message: '¿Está seguro de que desea eliminar el siguiente registro? <br/><strong>' + registro.nombre + '</strong>',
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
                        this.alertService.showAlert(EXITOSO_ITEM_ELIMINADO, STYLE_SUCCESS_CENTER, false);

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
     * Metodo que permite inicializar las variable globales
     */
    private init(): void {

        // se define la variable que se utiilza para creacion de item
        this.itemCrear = new CommonVO();

        // se configura el id del item, esto para identificar que tabla parametrica se va insertar
        this.itemCrear.id = this.item.idItem;
    }
}