import { STYLE_SUCCESS_CENTER, NOMENCLATURA_CREADA } from './../../../../../z-util/Constants';
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
     * Metodo que soporta el evento del boton crear consecutivo
     */
    private crearConsecutivoSistema(): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se muestra el modal de carga
        this.utilService.displayLoading(true);

        // se organiza los datos antes de persistir
        this.organizarDatosAntesPersistir();

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
     * Metodo que permite cerrar el panel de creacion de consecutivo
     */
    private cerrarPanelCreacion(): void {
        this.nomenclaturaCrearEditar = null;
    }

    /**
     * Metodo que se utiliza para configurar los datos antes de persistir
     */
    private organizarDatosAntesPersistir(): void {
        this.nomenclaturaCrearEditar.nomenclaturaVO.nombre = this.nomenclaturaCrearEditar.nomenclaturaVO.nombre.trim();
        this.nomenclaturaCrearEditar.nomenclaturaVO.nomenclatura = this.nomenclaturaCrearEditar.nomenclaturaVO.nomenclatura.trim();
        this.nomenclaturaCrearEditar.configurarByteVisibilidad();
    }
}