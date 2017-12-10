import { EXITOSO_CONSECUTIVO_GENERADO, STYLE_SUCCESS_CENTER } from './../../../z-util/Constants';
import { ConsecutivoResponseDTO } from './../../../c-model/c-correspondencia/solicitar_consecutivo/ConsecutivoResponseDTO';
import { AutocompleteUtil } from './../../../z-util/AutoComplete-util';
import { WraperNomeclaturaConsecutivo } from './../../../c-model/a-admin/parametrizacion/WraperNomeclaturaConsecutivo';
import { ConsecutivoCorrespondenciaDTO } from './../../../c-model/c-correspondencia/solicitar_consecutivo/ConsecutivoCorrespondenciaDTO';
import { InitSolicitarConsecutivoDTO } from './../../../c-model/c-correspondencia/solicitar_consecutivo/InitSolicitarConsecutivoDTO';
import { CommonVO } from './../../../c-model/a-admin/parametrizacion/CommonVO';
import { CorrespondenciaService } from './../../../b-service/b-correspondencia/correspondencia.service';
import { Util } from './../../../z-util/Util';
import { NomenclaturasConsecutivosVO } from './../../../c-model/a-admin/parametrizacion/NomenclaturasConsecutivosVO';
import { AdministradorService } from './../../../b-service/a-admin/administrador.service';
import { AlertService } from './../../../b-service/z-common/alert.service';
import { UtilitarioService } from './../../../b-service/z-common/utilitario.service';
import { ComponentCommon } from './../../../z-util/Component-common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

/**
 * Componente para la pagina de solicitar consecutivo de correspondencia
 */
@Component({
    selector: 'app-solicitar-consecutivo',
    templateUrl: './solicitar-consecutivo.component.html'
})
export class SolicitarConsecutivoComponent extends ComponentCommon implements OnInit {

    /**Es el ID del input del autocomplete de funcionarios*/
    private ID_INPUT_AUTOCOMPLETE_FUNCIONARIOS: string = "funcionario";

    /**Div que contiene el autocomplete de funcionarios para el focus*/
    @ViewChild('divSolicitud')
    private divSolicitud: ElementRef;

    /**DTO que contiene los datos iniciales del modulo*/
    private init: InitSolicitarConsecutivoDTO;

    /**Es la localidad para los componentes fechas*/
    private es: any;

    /** Es la lista de funcionarios consultados en BD**/
    private funcionarios: Array<CommonVO>;

    /**Es el modelo del componente de autocomplete de funcionarios*/
    private autocompleteFuncionarios: AutocompleteUtil;

    /**Es la nomenclatura seleccionado para solicitar un consecutivo*/
    private nomenclaturaSeleccionada: WraperNomeclaturaConsecutivo;

    /**DTO para mapear los valores ingresados por el usuario (request)*/
    private datosSolicitud: ConsecutivoCorrespondenciaDTO;

    /**DTO que contiene los datos del consecutivo generado (response)*/
    private datosConsecutivo: ConsecutivoResponseDTO;

    /**Bandera para visualizar el modal de confirmacion para solicitar un consecutivo*/
    private showModalConfirmation: boolean;

    /**
     * Constructor del componente para solicitudes de consecutivos de correspondencia
     * 
     * @param utilService, service con las funciones utilitarias
     * @param alertService, service para la comunicacion del componente de mensaje de alerta
     * @param correspondenciaService, contiene los servicios para el modulo de correspondencia
     * @param administradorService, contiene los servicios administrativo
     */
    constructor(
        protected utilService: UtilitarioService,
        protected alertService: AlertService,
        private correspondenciaService: CorrespondenciaService,
        private administradorService: AdministradorService) {
        super(utilService, alertService);
    }

    /**
     * PostConstructor que permite inicializar las variables del component
     */
    ngOnInit(): void {

        // se consultan los datos iniciales del modulo
        this.getInit();

        // se configura la localidad para fechas
        this.es = Util.getCalendarLocale();
    }

    /**
     * Metodo que soporta el evento click para cada tab de cada nomenclatura
     * 
     * @param nomenclatura , Es la nomenclatura seleccionado por el usuario
     *  para solicitar un consecutivo de correspondencia
     */
    public clickNomenclatura(nomenclatura: NomenclaturasConsecutivosVO): void {

        // se valida que no se la misma nomenclatura
        if (this.nomenclaturaSeleccionada &&
            this.nomenclaturaSeleccionada.nomenclaturaVO &&
            this.nomenclaturaSeleccionada.nomenclaturaVO.idNomenclatura == nomenclatura.idNomenclatura) {
            return;
        }

        // se configura los datos de esta nomenclatura
        this.nomenclaturaSeleccionada = new WraperNomeclaturaConsecutivo();
        this.nomenclaturaSeleccionada.nomenclaturaVO = new NomenclaturasConsecutivosVO();
        this.nomenclaturaSeleccionada.nomenclaturaVO.idNomenclatura = nomenclatura.idNomenclatura;
        this.nomenclaturaSeleccionada.nomenclaturaVO.nomenclatura = nomenclatura.nomenclatura;
        this.nomenclaturaSeleccionada.nomenclaturaVO.nombre = nomenclatura.nombre;
        this.nomenclaturaSeleccionada.nomenclaturaVO.fechaElaboracionEditable = nomenclatura.fechaElaboracionEditable;
        this.nomenclaturaSeleccionada.nomenclaturaVO.elaboradoPorVisible = nomenclatura.elaboradoPorVisible;
        this.nomenclaturaSeleccionada.nomenclaturaVO.dirigidoAVisible = nomenclatura.dirigidoAVisible;
        this.nomenclaturaSeleccionada.nomenclaturaVO.asuntoVisible = nomenclatura.asuntoVisible;
        this.nomenclaturaSeleccionada.nomenclaturaVO.fechaSacVisible = nomenclatura.fechaSacVisible;
        this.nomenclaturaSeleccionada.nomenclaturaVO.nroSacVisible = nomenclatura.nroSacVisible;
        this.nomenclaturaSeleccionada.nomenclaturaOrigen = nomenclatura;

        // se configuran las banderas que indican que campos son para digilenciar
        this.nomenclaturaSeleccionada.configurarBanderas();

        // se visualiza el panel de solicitud
        this.showPanelSolicitud();
    }

    /**
     * Metodo que es invocado antes de solicitar el consecutivo donde se muestra el modal de confirmacion
     */
    public abrirModalConfirmacion(): void {

        // se organizan los datos de entrada por el usuario
        this.organizarDatosSolicitud();

        // se muestra el modal con esta bandera
        this.showModalConfirmation = true;
    }

    /**
     * Metodo que es invocado al cerrar el modal de confirmacion
     */
    public cerrarModalConfirmacion(): void {
        this.showModalConfirmation = false;
    }

    /**
     * Metodo que permite generar un consecutivo de correspondencia para el anio actual
     */
    public solicitarConsecutivoAnioActual(): void {

        // se cierra el modal de confirmation
        this.cerrarModalConfirmacion();

        // se muestra el modal de carga
        this.utilService.displayLoading(true);

        // se invoca el servicio para generar el nuevo consecutivo
        this.correspondenciaService.solicitarConsecutivoAnioActual(this.datosSolicitud).subscribe(
            data => {
                // se configuran el DTO del response
                this.datosConsecutivo = data.json();

                // se configura la nueva cantidad de consecutivos a la nomenclatura seleccionada
                this.nomenclaturaSeleccionada.nomenclaturaOrigen.cantConsecutivos = this.datosConsecutivo.cantConsecutivos;

                // se configura los datos de la solicitud
                this.datosConsecutivo.datosSolicitud = this.datosSolicitud;

                // se abre el panel exitoso limpiando la variable de la solicitud
                this.datosSolicitud = null;

                // se muestra el mensaje exitoso
                setTimeout(() => {
                    this.alertService.showAlert(EXITOSO_CONSECUTIVO_GENERADO, STYLE_SUCCESS_CENTER, false);
                }, 100)

                // se cierra el modal de carga
                this.utilService.displayLoading(false);
            },
            error => {
                this.showErrorSistema(error);
            }
        );
    }

    /**
     * Metodo que permite configurar todo lo que necesita para visualizar
     * el panel de solicitud, tambien soporta el evento click del boton Finalizar
     */
    public showPanelSolicitud(): void {

        // se limpia el consecutivo generado, con esto se cierra panel exitoso
        this.datosConsecutivo = null;

        // se limpia el submit anterior
        this.cleanSubmit();

        // se limpia el autocomplete, esto por si hay alguna instancia anterior
        this.autocompleteFuncionarios = null;

        // los funcionarios aplica solamente para el campo elaborado por
        if (this.nomenclaturaSeleccionada.elaboradoPorVisibleB) {

            // se crea la instancia del autocomplete
            this.autocompleteFuncionarios = new AutocompleteUtil();

            // se configura los funcionarios para el componente autocomplete
            if (!this.funcionarios) {
                this.listarFuncionarios();
            } else {
                this.configurarAutocompleteFuncionarios();
            }
        }

        // se crea la instancia del DTO donde mapea los datos ingresados
        this.datosSolicitud = new ConsecutivoCorrespondenciaDTO();

        // se configura la fecha de elaboracion por default
        this.datosSolicitud.fechaElaboracion = new Date(this.init.fechaActual);

        // se configura la fecha SAC por default solo si es visible
        if (this.nomenclaturaSeleccionada.fechaSacVisibleB) {
            this.datosSolicitud.fechaSAC = new Date(this.init.fechaActual);
        }
    }

    /**
     * Metodo que permite obtener los datos iniciales del modulo
     */
    private getInit(): void {

        // se muestra el modal de carga
        this.utilService.displayLoading(true);

        // se invoca el servicio para obtener los datos iniciales
        this.correspondenciaService.getDatosInitSolicitarConsecutivo().subscribe(
            data => {
                // se configura el DTO que contiene los datos iniciales
                this.init = data.json();

                // se cierra el modal de carga
                this.utilService.displayLoading(false);
            },
            error => {
                this.showErrorSistema(error);
            }
        );
    }

    /**
     * Metodo que permite obtener los funcionarios en BD
     */
    private listarFuncionarios(): void {

        // se muestra el modal de carga
        this.utilService.displayLoading(true);

        // se invoca el servicio para obtener los funcionarios
        this.administradorService.getItemsParametricos(3).subscribe(
            data => {
                // se construye los funcionarios
                this.funcionarios = data.json();

                // se configura el autocomplete de los funcionarios
                this.configurarAutocompleteFuncionarios();

                // se cierra el modal de carga
                this.utilService.displayLoading(false);
            },
            error => {
                this.showErrorSistema(error);
            }
        );
    }

    /**
     * Metodo que permite configurar el modelo del autocomplete de funcionarios
     */
    private configurarAutocompleteFuncionarios(): void {
        this.autocompleteFuncionarios.items = this.funcionarios;
        this.autocompleteFuncionarios.inputDIV = this.divSolicitud;
        this.autocompleteFuncionarios.inputID = this.ID_INPUT_AUTOCOMPLETE_FUNCIONARIOS;
    }

    /**
     * Metodo que permite organizar los datos antes de solicitar un consecutivo
     */
    private organizarDatosSolicitud(): void {

        // se configura el ID de la nomenclatura seleccionada
        this.datosSolicitud.idNomenclatura = this.nomenclaturaSeleccionada.nomenclaturaVO.idNomenclatura;

        // se configura el id del funcionario
        if (this.nomenclaturaSeleccionada.elaboradoPorVisibleB) {
            this.datosSolicitud.idFuncionario = this.autocompleteFuncionarios.itemSeleccionado.id;
            this.datosSolicitud.nombreFuncionario = this.autocompleteFuncionarios.itemSeleccionado.nombre;
        }

        // se limpia los espacios en blanco del campo "Dirigido A"
        this.datosSolicitud.destinatario = (this.nomenclaturaSeleccionada.dirigidoAVisibleB) ? this.datosSolicitud.destinatario.trim() : null;

        // se limpia los espacios en blanco del campo "Asunto"
        this.datosSolicitud.asunto = (this.nomenclaturaSeleccionada.asuntoVisibleB) ? this.datosSolicitud.asunto.trim() : null;

        // se limpia los espacios en blanco del campo "NroSac"
        this.datosSolicitud.nroSAC = (this.nomenclaturaSeleccionada.nroSacVisibleB) ? this.datosSolicitud.nroSAC.trim() : null;
    }
}