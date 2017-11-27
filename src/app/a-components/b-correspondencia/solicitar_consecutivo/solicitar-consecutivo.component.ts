import { InitSolicitarConsecutivoDTO } from './../../../c-model/c-correspondencia/solicitar_consecutivo/InitSolicitarConsecutivoDTO';
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

    /**Es la nomenclatura seleccionado para solicitar un consecutivo*/
    private nomenclaturaSeleccionada: NomenclaturasConsecutivosVO;

    /**
     * Constructor del componente para solicitudes de consecutivos de correspondencia
     * @param utilService, service con las funciones utilitarias
     * @param alertService, service para la comunicacion del componente de mensaje de alerta
     * @param correspondenciaService, contiene los servicios para el modulo de correspondencia
     */
    constructor(
        protected utilService: UtilitarioService,
        protected alertService: AlertService,
        private correspondenciaService: CorrespondenciaService) {
        super(utilService, alertService);
    }

    /**
     * PostConstructor que permite inicializar las variables del component
     */
    ngOnInit(): void {

        // se consultan los datos iniciales del modulo
        this.getInit();

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
        this.nomenclaturaSeleccionada = nomenclatura;
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

                // se configura la fecha actual del sistema
                this.init.fechaActual = new Date(this.init.fechaActual);

                // se cierra el modal de carga
                this.utilService.displayLoading(false);
            },
            error => {
                this.showErrorSistema(error);
            }
        );
    }
}