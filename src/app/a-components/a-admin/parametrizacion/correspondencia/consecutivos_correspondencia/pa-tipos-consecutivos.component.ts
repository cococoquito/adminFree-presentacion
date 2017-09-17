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

    /**
    * Constructor del componente para la administracion de los tipos de consecutivos
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

        // se crea la nomenclatura para ser diligenciada por pantalla
        this.nomenclaturaCrearEditar = new WraperNomeclaturaConsecutivo();
        this.nomenclaturaCrearEditar.nomenclatura = new NomenclaturasConsecutivosVO();
        this.nomenclaturaCrearEditar.fechaElaboracionEditableB = false;
        this.nomenclaturaCrearEditar.elaboradoPorVisibleB = true;
        this.nomenclaturaCrearEditar.dirigidoAVisibleB = true;
        this.nomenclaturaCrearEditar.asuntoVisibleB = true;
        this.nomenclaturaCrearEditar.fechaSacVisibleB = true;
        this.nomenclaturaCrearEditar.nroSacVisibleB = true;

        this.submitted = false;
    }

    private crearConsecutivoCorrespondencia(): void{

    }

    /**
     * Metodo que permite cerrar el panel de creacion de consecutivo
     */
    private cerrarPanelCreacion(): void {
        this.nomenclaturaCrearEditar = null;
    }




}