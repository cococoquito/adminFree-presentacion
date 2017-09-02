import { ParametrizacionRegistrosComponent } from './../parametrizacion-registros.component';
import { STYLE_SUCCESS_CENTER, ITEM_REGISTRADO_EXITOSAMENTE, EXITOSO_ITEM_ELIMINADO, EXITOSO_ITEMS_UPDATE } from './../../../../z-util/Constants';
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

    /** representa el nombre del item, funcionario, ciudad, solicitud etc*/
    private nombreItem: string;

    /** bandera que indica si la pantalla esta en modo de edicion, se habilita al dar clic en editar un registro*/
    private modoEdicion: boolean;

    /** Lista que contiene los items modificados*/
    private itemsModificados: Array<CommonVO>;

    /** es el item que esta seleccionado para editarlo*/
    private itemEdicion: CommonVO;

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

        // se inicializa el modo de edicion
        this.initModoEdicion();
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
     * Metodo que respalda el evento del boton Eliminar 
     * 
     * @param itemEliminar , es el item seleccionado por el usuario para eliminar
     */
    private eliminarItemParametrico(itemEliminar: CommonVO): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se indica que el usuario no ha dado submit
        this.submitted = false;

        // se procede abrir la ventana de confirmacion
        this.confirmationService.confirm({
            message: '¿Está seguro de que desea eliminar el siguiente ' + this.nombreItem + '? <br/><strong>' + itemEliminar.nombre + '</strong>',
            header: 'Confirmación',
            icon: 'fa fa-trash',
            accept: () => {

                // se muestra el modal de carga
                this.utilService.displayLoading(true);

                // susbripcion para la eliminacion del item
                this.administradorService.eliminarItemParametrico(itemEliminar.id, this.item.idItem).subscribe(
                    data => {
                        // se construye los ITEMS que retorna el servicio
                        this.items = data.json();

                        // se muestra el mensaje exitoso en pantalla
                        let msj = EXITOSO_ITEM_ELIMINADO.replace("?1", this.nombreItem).replace("?2", itemEliminar.nombre);
                        this.alertService.showAlert(msj, STYLE_SUCCESS_CENTER, false);

                        // se inicializa el modo de edicion
                        this.initModoEdicion();

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
     * Metodo que respalda el evento del boton Editar de la tabla de items
     * 
     * @param itemEditar , es el item seleccionado por el usuario para Editar
     */
    private editarItemParametrico(itemEditar: CommonVO): void {

        // se indica que el usuario no ha dado submit
        this.submitted = false;

        // se valida si hay un item seleccionado con anterioridad
        if (this.itemEdicion) {

            // NO APLICA si es el mismo item seleccionado
            if (this.itemEdicion.id == itemEditar.id) {
                return;
            }

            // NO APLICA si el nombre del item anterior es null o vacio
            this.itemEdicion.nombre = (this.itemEdicion.nombre) ? this.itemEdicion.nombre.trim() : null;
            if (!this.itemEdicion.nombre) {
                return;
            }

            // se inabilita el item seleccionado con anterioridad
            this.itemEdicion.habilitarEdicion = false;
        }

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se configura el nombre del origen para el item seleccionado
        if (!itemEditar.nombreOrigen) {
            itemEditar.nombreOrigen = itemEditar.nombre;
        }

        // se habilita el modo de edicion tanto para el boton como el item seleccionado
        itemEditar.habilitarEdicion = true;
        this.modoEdicion = true;

        // se configura el item seleccionado como el item actual para editar
        this.itemEdicion = itemEditar;
    }

    /**
     * Metodo que soporta el evento change del nombre del item en edicion
     * 
     * @param itemChange, es el item quien ejecuta el evento porque cambio su nombre 
     */
    private changeItemParametrico(itemChange: CommonVO): void {

        // se inicializa el item como no modificado
        itemChange.itemModificado = false;

        // NO APLICA si el item es nulo o vacio
        itemChange.nombre = (itemChange.nombre) ? itemChange.nombre.trim() : null;
        if (!itemChange.nombre) {

            // se elimina de la lista que almacena los items modificados
            this.eliminarItemModificado(itemChange);
            return;
        }

        // si el item tiene el nombre diferente a su origen es porque el item fue modificado
        if (itemChange.nombreOrigen != itemChange.nombre) {

            // se configura el item como modificado
            itemChange.itemModificado = true;

            // se verifica si este item ya fue modificado con anterioridad
            if (this.itemsModificados.length > 0) {
                for (let itemModificado of this.itemsModificados) {
                    if (itemModificado.id == itemChange.id) {
                        return;
                    }
                }
            }

            // si llega a esta instancia es porque el item no ha sido modificado con anterioridad
            this.itemsModificados.push(itemChange);
        } else {
            // se procede a eliminar el item de los items modificados ya que el nombre y el origen son iguales
            this.eliminarItemModificado(itemChange);
        }
    }

    /**
     * Metodo que soporta el evento del boton cancelar edicion
     */
    private cancelarEdicionItemParametrico(): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();        

        // se recorre lo items modificados para hacer rolback a las modificaciones
        if (this.itemsModificados.length > 0) {
            for (let itemEditado of this.itemsModificados) {

                // no se debe tener en cuenta el item en edicion ya que lo limpian mas abajo
                if (this.itemEdicion && this.itemEdicion.id == itemEditado.id) {
                    continue;
                }

                // se hace rolback del nombre y se limpia la bandera que lo identifica si fue modificado
                itemEditado.nombre = itemEditado.nombreOrigen;
                itemEditado.itemModificado = false;
                itemEditado.nombreOrigen = null;
            }
        }

        // se hace rolback al item que se encuentra en edicion
        if (this.itemEdicion) {
            this.itemEdicion.nombre = this.itemEdicion.nombreOrigen;
            this.itemEdicion.itemModificado = false;
            this.itemEdicion.habilitarEdicion = false;
            this.itemEdicion.nombreOrigen = null;
        }

        // se inicializa el modo de edicion
        this.initModoEdicion();
    }

    /**
     * Metodo que respalda el evento del boton aplicar cambios
     */
    private aplicarCambiosEdicion(): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se hace la edicion solo si hay items modificados
        if (this.itemsModificados && this.itemsModificados.length > 0) {

            // se muestra el modal de carga
            this.utilService.displayLoading(true);

            // se procede actualizar los items modificados
            this.administradorService.editarItemsParametrico(this.itemsModificados, this.item.idItem).subscribe(
                data => {
                    // se construye los ITEMS que retorna el servicio
                    this.items = data.json();

                    // se muestra el mensaje exitoso en pantalla
                    this.alertService.showAlert(EXITOSO_ITEMS_UPDATE, STYLE_SUCCESS_CENTER, false);

                    // se reinicia le modo de edicion
                    this.initModoEdicion();

                    // se cierra el modal de carga
                    this.utilService.displayLoading(false);
                },
                error => {
                    this.showErrorSistema(error);
                }
            );

        } else {
            this.cancelarEdicionItemParametrico();
        }
    }

    /**
     * Metodo que permite inicializar el modo de edicion
     */
    private initModoEdicion(): void {

        // si inicialia el modo de edicion inactivo
        this.modoEdicion = false;

        // se crea la lista que contiene los items modificados
        this.itemsModificados = new Array<CommonVO>();

        // se limpia el item seleccionado para editar
        this.itemEdicion = null;
    }

    /**
     * Metodo que permite eliminar el item de la lista que guarda los items modificados
     * 
     * @param itemEliminar , es el valor del item a eliminar
     */
    private eliminarItemModificado(itemEliminar: CommonVO): void {

        // se verifica si hay item modificado en la lista
        if (this.itemsModificados.length > 0) {

            // se recorre los items modificados
            for (let itemModificado of this.itemsModificados) {

                // se verifica si el item a eliminar es el mismo que este item
                if (itemModificado.id == itemEliminar.id) {

                    // la funcion splice es para eliminar el item de la lista
                    let i = this.itemsModificados.indexOf(itemModificado, 0);
                    if (i > -1) {
                        this.itemsModificados.splice(i, 1);
                    }
                    return;
                }
            }
        }
    }

    /**
     * Metodo que configura el nombre de la entidad para el item seleccionado
     */
    private configurarNombreItem(): void {

        // para el item de Correspondencia>>Funcionario
        if (this.item.idItem == this.CORRESPONDENCIA_ITEM3) {
            this.nombreItem = "funcionario";
        }
    }
}