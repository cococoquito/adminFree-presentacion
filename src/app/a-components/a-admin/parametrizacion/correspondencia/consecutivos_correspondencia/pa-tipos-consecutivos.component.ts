import { STYLE_SUCCESS_CENTER, NOMENCLATURA_CREADA, NOMENCLATURA_ELIMINADO, NOMENCLATURA_EDITADA } from './../../../../../z-util/Constants';
import { AdministradorService } from './../../../../../b-service/a-admin/administrador.service';
import { ConfirmationService } from 'primeng/primeng';
import { AlertService } from './../../../../../b-service/z-common/alert.service';
import { UtilitarioService } from './../../../../../b-service/z-common/utilitario.service';
import { ComponentCommon } from './../../../../../z-util/Component-common';
import { WraperNomeclaturaConsecutivo } from './../../../../../c-model/a-admin/parametrizacion/WraperNomeclaturaConsecutivo';
import { NomenclaturasConsecutivosVO } from './../../../../../c-model/a-admin/parametrizacion/NomenclaturasConsecutivosVO';
import { ModuloItemDTO } from './../../../../../c-model/a-admin/seguridad/ModuloItemDTO';
import { ModuloDTO } from './../../../../../c-model/a-admin/seguridad/ModuloDTO';
import { Component, OnInit, Input } from '@angular/core';

/**
 * Componente para las parametrizaciones de los tipos de consecutivos de correspondencia
 */
@Component({
    selector: 'pa-tipos-consecutivos',
    templateUrl: './pa-tipos-consecutivos.component.html'
})
export class PaTiposConsecutivosComponent extends ComponentCommon implements OnInit {

    /** Es el item seleccionado por el usuario*/
    @Input()
    public item: ModuloItemDTO;

    /** Es el modulo del item seleccionado por el usuario*/
    @Input()
    public modulo: ModuloDTO;

    /** VO que se utiliza para crear o editar la nomenclatura*/
    private nomenclaturaCrearEditar: WraperNomeclaturaConsecutivo;

    /**lista de tipos de consecutivos de correspondencia parametrizados en el sistema*/
    private nomenclaturas: Array<NomenclaturasConsecutivosVO>;

    /**
    * Constructor del componente para la administracion de los tipos de consecutivos de correspondencia
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

        // se consultan los tipos de consecutivos ACTIVOS parametrizados en el sistema
        this.getTiposConsecutivos();
    }

    /**
     * Metodo que permite obtener los tipos de consecutivos parametrizados en el sistema
     */
    private getTiposConsecutivos(): void {

        // se muestra el modal de carga
        this.utilService.displayLoading(true);

        // se invoca el servicio para obtener las nomenclaturas en estado ACTIVO
        this.administradorService.listarTiposConsecutivos().subscribe(
            data => {
                // se configura los tipos de consecutivos retornado por el servicio
                this.nomenclaturas = data.json();

                // se cierra el modal de carga
                this.utilService.displayLoading(false);
            },
            error => {
                this.showErrorSistema(error);
            }
        );
    }

    /**
     * Metodo que permite abrir el panel de creacion de consecutivo
     */
    private abrirPanelCreacion(): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se indica que el usuario no ha dado commit
        this.submitted = false;

        // se crea la nomenclatura para ser diligenciada por pantalla
        this.nomenclaturaCrearEditar = new WraperNomeclaturaConsecutivo();
        this.nomenclaturaCrearEditar.nomenclaturaVO = new NomenclaturasConsecutivosVO();
        this.nomenclaturaCrearEditar.fechaElaboracionEditableB = false;
        this.nomenclaturaCrearEditar.elaboradoPorVisibleB = true;
        this.nomenclaturaCrearEditar.dirigidoAVisibleB = true;
        this.nomenclaturaCrearEditar.asuntoVisibleB = true;
        this.nomenclaturaCrearEditar.fechaSacVisibleB = true;
        this.nomenclaturaCrearEditar.nroSacVisibleB = true;
    }

    /**
    * Metodo que permite abrir el panel para la edicion del consecutivo
    *
    * @param tipo , VO con los datos del tipo de consecutivo a editar
    */
    private abrirPanelEdicion(tipo: NomenclaturasConsecutivosVO): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se indica que el usuario no ha dado commit
        this.submitted = false;

        //se crear la instancia de la nomenclatura a editar
        this.nomenclaturaCrearEditar = new WraperNomeclaturaConsecutivo();
        this.nomenclaturaCrearEditar.nomenclaturaVO = new NomenclaturasConsecutivosVO();
        this.nomenclaturaCrearEditar.nomenclaturaVO.idNomenclatura = tipo.idNomenclatura;
        this.nomenclaturaCrearEditar.nomenclaturaVO.nomenclatura = tipo.nomenclatura;
        this.nomenclaturaCrearEditar.nomenclaturaVO.nombre = tipo.nombre;
        this.nomenclaturaCrearEditar.nomenclaturaVO.fechaElaboracionEditable = tipo.fechaElaboracionEditable;
        this.nomenclaturaCrearEditar.nomenclaturaVO.elaboradoPorVisible = tipo.elaboradoPorVisible;
        this.nomenclaturaCrearEditar.nomenclaturaVO.dirigidoAVisible = tipo.dirigidoAVisible;
        this.nomenclaturaCrearEditar.nomenclaturaVO.asuntoVisible = tipo.asuntoVisible;
        this.nomenclaturaCrearEditar.nomenclaturaVO.fechaSacVisible = tipo.fechaSacVisible;
        this.nomenclaturaCrearEditar.nomenclaturaVO.nroSacVisible = tipo.nroSacVisible;

        // se configura el origen de la nomenclatura a editar
        this.nomenclaturaCrearEditar.nomenclaturaOrigen = tipo;

        // se configuran las banderas que indican que campos son para digilenciar
        this.nomenclaturaCrearEditar.configurarBanderas();
    }

    /**
     * Metodo que soporta el evento de crear o editar consecutivo de la pantalla
     */
    private crearEditarConsecutivoSistema(): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se organiza los datos antes de persistir
        this.organizarDatosAntesPersistir();

        // se llama el metodo de crear o editar dependiendo de la accion
        if (this.nomenclaturaCrearEditar.nomenclaturaVO.idNomenclatura) {

            // se edita el consecutivo solo si hay modificaciones
            if (this.esTipoConsecutivoModificado()) {
                this.editarConsecutivoSistema();
            } else {
                // se limpia la variable para retornar a la lista de nomenclaturas
                this.nomenclaturaCrearEditar = null;
            } 
        } else {
            this.crearConsecutivoSistema();
        }
    }

    /**
     * Metodo que permite crear el consecutivo en el sistema
     */
    private crearConsecutivoSistema(): void {

        // se muestra el modal de carga
        this.utilService.displayLoading(true);

        // se invoca el servicio para crear la nomenclatura en el sistema
        this.administradorService.insertarTipoConsecutivo(this.nomenclaturaCrearEditar.nomenclaturaVO).subscribe(
            data => {
                // se configura los tipos de consecutivos retornado por el servicio
                this.nomenclaturas = data.json();

                // se muestra el mensaje exitoso en pantalla
                this.alertService.showAlert(NOMENCLATURA_CREADA.replace("?1", this.nomenclaturaCrearEditar.nomenclaturaVO.nomenclatura), STYLE_SUCCESS_CENTER, false);

                // se limpia la variable para retornar a la lista de nomenclaturas
                this.nomenclaturaCrearEditar = null;

                // se cierra el modal de carga
                this.utilService.displayLoading(false);
            },
            error => {
                this.showErrorSistema(error);
            }
        );
    }

    /**
     * Metodo que permite editar el consecutivo en el sistema
     */
    private editarConsecutivoSistema(): void {

        // se muestra el modal de carga
        this.utilService.displayLoading(true);

        // se invoca el servicio para editar la nomenclatura en el sistema
        this.administradorService.editarTipoConsecutivo(this.nomenclaturaCrearEditar.nomenclaturaVO).subscribe(
            data => {
                // se configura los tipos de consecutivos retornado por el servicio
                this.nomenclaturas = data.json();

                // se muestra el mensaje exitoso en pantalla
                this.alertService.showAlert(NOMENCLATURA_EDITADA.replace("?1", this.nomenclaturaCrearEditar.nomenclaturaVO.nomenclatura), STYLE_SUCCESS_CENTER, false);

                // se limpia la variable para retornar a la lista de nomenclaturas
                this.nomenclaturaCrearEditar = null;

                // se cierra el modal de carga
                this.utilService.displayLoading(false);
            },
            error => {
                this.showErrorSistema(error);
            }
        );
    }

    /**
     * Metodo que permite soporta el evento del boton de eliminar tipo de consecutivo
     * 
     * @param tipo , VO con los datos del tipo de consecutivo a eliminar
     */
    private eliminarTipoConsecutivo(tipo: NomenclaturasConsecutivosVO): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se procede abrir la ventana de confirmacion
        this.confirmationService.confirm({
            message: '¿Está seguro de que desea eliminar el siguiente tipo de consecutivo? <br/><strong>' + tipo.nomenclatura + '</strong>',
            header: 'Confirmación',
            icon: 'fa fa-trash',
            accept: () => {

                // se muestra el modal de carga
                this.utilService.displayLoading(true);

                // susbripcion para la eliminacion del tipo de consecutivo
                this.administradorService.eliminarTipoConsecutivo(tipo.idNomenclatura).subscribe(
                    data => {
                        // se configura los tipos de consecutivos retornado por el servicio
                        this.nomenclaturas = data.json();

                        // se muestra el mensaje exitoso en pantalla
                        this.alertService.showAlert(NOMENCLATURA_ELIMINADO.replace("?1", tipo.nomenclatura), STYLE_SUCCESS_CENTER, false);

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
     * Metodo que permite cerrar el panel de creacion o edicion del consecutivo
     */
    private cerrarPanelCreacionEdicion(): void {

        // se limpia la variable para retornar a la lista de nomenclaturas
        this.nomenclaturaCrearEditar = null;

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();
    }

    /**
     * Metodo que se utiliza para configurar los datos antes de persistir
     */
    private organizarDatosAntesPersistir(): void {

        // se elimina los espacios en blanco inicio y final
        this.nomenclaturaCrearEditar.nomenclaturaVO.nombre = this.nomenclaturaCrearEditar.nomenclaturaVO.nombre.trim();
        this.nomenclaturaCrearEditar.nomenclaturaVO.nomenclatura = this.nomenclaturaCrearEditar.nomenclaturaVO.nomenclatura.trim();

        // se inicializa la bandera que identifica si hay modificaciones en la nomenclatura
        this.nomenclaturaCrearEditar.nomenclaturaVO.nomenclaturaModificada = false;

        // se configuran los bytes que indican que campos son para digilenciar
        this.nomenclaturaCrearEditar.configurarByteVisibilidad();
    }

    /**
     * Metodo que permite identificar si hubo modificaciones para editar el tipo de consecutivo
     */
    private esTipoConsecutivoModificado(): boolean {

        // se obtiene la nomenclatura a editar
        let nomenclaturaEditar = this.nomenclaturaCrearEditar.nomenclaturaVO;
        let nomenclaturaOrigen = this.nomenclaturaCrearEditar.nomenclaturaOrigen;

        // se verifica si la nomenclatura fue modificado
        if (nomenclaturaEditar.nomenclatura != nomenclaturaOrigen.nomenclatura) {
            nomenclaturaEditar.nomenclaturaModificada = true;
            return true;
        }        

        // se verifica si el nombre fue modificado
        if (nomenclaturaEditar.nombre != nomenclaturaOrigen.nombre) {
            return true;
        }

        // se verifica si la fecha de elaboracion fue modificado
        if (nomenclaturaEditar.fechaElaboracionEditable != nomenclaturaOrigen.fechaElaboracionEditable) {
            return true;
        }

        // se verifica si el campo elaborado por fue modificado
        if (nomenclaturaEditar.elaboradoPorVisible != nomenclaturaOrigen.elaboradoPorVisible) {
            return true;
        }

        // se verifica si el campo dirigido A por fue modificado
        if (nomenclaturaEditar.dirigidoAVisible != nomenclaturaOrigen.dirigidoAVisible) {
            return true;
        }

        // se verifica si el campo asunto por fue modificado
        if (nomenclaturaEditar.asuntoVisible != nomenclaturaOrigen.asuntoVisible) {
            return true;
        }

        // se verifica si el campo fecha SAC por fue modificado
        if (nomenclaturaEditar.fechaSacVisible != nomenclaturaOrigen.fechaSacVisible) {
            return true;
        }

        // se verifica si el campo Nro SAC por fue modificado
        if (nomenclaturaEditar.nroSacVisible != nomenclaturaOrigen.nroSacVisible) {
            return true;
        }
        return false;
    }
}