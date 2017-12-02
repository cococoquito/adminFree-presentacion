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
import { Component, OnInit } from '@angular/core';

/**
 * Componente para la pagina de solicitar consecutivo de correspondencia
 */
@Component({
    selector: 'app-solicitar-consecutivo',
    templateUrl: './solicitar-consecutivo.component.html'
})
export class SolicitarConsecutivoComponent extends ComponentCommon implements OnInit {

    /**DTO que contiene los datos iniciales del modulo*/
    private init: InitSolicitarConsecutivoDTO;

    /**Es la localidad para los componentes fechas*/
    private es: any;

    /** Es la lista de funcionarios consultados en BD **/
    private funcionarios: Array<CommonVO>;

    /** Es la lista a mostrar en el componente automplete de funcionarios **/
    private funcionariosFilter: any[];

    /**Es la nomenclatura seleccionado para solicitar un consecutivo*/
    private nomenclaturaSeleccionada: WraperNomeclaturaConsecutivo;

    /**DTO que contiene los datos para solicitar el consecutivo*/
    private consecutivoCorrespondencia: ConsecutivoCorrespondenciaDTO;

    /**
     * Constructor del componente para solicitudes de consecutivos de correspondencia
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

        this.listarFuncionarios();

        // se configura la localidad
        this.es = Util.getCalendarLocale();
    }

    /**
     * Metodo que soporta el evento click para cada tab de cada nomenclatura
     * 
     * @param nomenclatura , Es la nomenclatura seleccionado por el usuario
     *  para solicitar un consecutivo
     */
    private clickNomenclatura(nomenclatura: NomenclaturasConsecutivosVO): void {

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
   
        // se configuran las banderas que indican que campos son para digilenciar
        this.nomenclaturaSeleccionada.configurarBanderas();


        

        // se inicializa el DTO para ingresar los datos de la solicitud
        this.initConsecutivoCorrespondencia();
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

                // se cierra el modal de carga
                this.utilService.displayLoading(false);
            },
            error => {
                this.showErrorSistema(error);
            }
        );
    }

    /**
     * Metodo que soporta el evento click del componente autocomplete de funcionarios
     * 
     * @param event , evento que se ejecuta desde la pantalla
     */
    private dropDownFuncionariosClick(event) {
        setTimeout(() => {
            this.funcionariosFilter = [];
            if (this.funcionarios) {
                for (let funcionario of this.funcionarios) {
                    this.funcionariosFilter.push(funcionario);
                }
            }
        }, 100)
    }

    /**
     * Metodo que se ejecuta cuando van ingresando valores en el componente 
     * autocomplete de funcionarios, donde se consultan los valores que 
     * coincidan con el valor ingresado
     * 
     * @param event , evento que se ejecuta desde la pantalla
     */
    private dropDownFuncionariosSearch(event) {
        this.funcionariosFilter = [];
        if (this.funcionarios) {
            for (let funcionario of this.funcionarios) {
                if (funcionario.nombre.toLowerCase().indexOf(event.query.toLowerCase()) >= 0) {
                    this.funcionariosFilter.push(funcionario);
                }
            }
        }
    }

    /**
     * Metodo que permite inicializar el DTO para la solicitud de la generacion del consecutivo
     */
    private initConsecutivoCorrespondencia(): void {
        this.consecutivoCorrespondencia = new ConsecutivoCorrespondenciaDTO();
        this.consecutivoCorrespondencia.fechaElaboracion = new Date(this.init.fechaActual);
        this.consecutivoCorrespondencia.fechaSAC = new Date(this.init.fechaActual);
    }
}