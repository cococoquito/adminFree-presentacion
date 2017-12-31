import { InitConsecutivoSolicitadosDTO } from './../../../c-model/c-correspondencia/consecutivos_solicitados/InitConsecutivoSolicitadosDTO';
import { Util } from './../../../z-util/Util';
import { AutocompleteUtil } from './../../../z-util/AutoComplete-util';
import { ComponentCommon } from './../../../z-util/Component-common';
import { AdministradorService } from './../../../b-service/a-admin/administrador.service';
import { CorrespondenciaService } from './../../../b-service/b-correspondencia/correspondencia.service';
import { AlertService } from './../../../b-service/z-common/alert.service';
import { UtilitarioService } from './../../../b-service/z-common/utilitario.service';
import { PaginadorModel } from './../../y-directivas/paginador/PaginadorModel';
import { ConsecutivoSolicitadoDTO } from './../../../c-model/c-correspondencia/consecutivos_solicitados/ConsecutivoSolicitadoDTO';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LazyLoadEvent } from 'primeng/primeng';

/**
 * Componente para la pagina de consecutivos solicitados para correspondencia
 */
@Component({
    selector: 'app-consecutivos-solicitados',
    templateUrl: './consecutivos-solicitados.component.html'
})
export class ConsecutivosSolicitadosComponent extends ComponentCommon implements OnInit {

    /**Es la localidad para los componentes fechas*/
    private es: any;

    private consecutivosPaginados: PaginadorModel;

    private init: InitConsecutivoSolicitadosDTO;

    /**Es el modelo del componente de autocomplete para los usuarios*/
    private autocompleteUsers: AutocompleteUtil;

    /**Div que contiene el autocomplete de funcionarios para el focus*/
    @ViewChild('user')
    private userAutocomplete: ElementRef;

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
        this.autocompleteUsers = new AutocompleteUtil();

        // se crea el paginador para consultar los consecutivos solicitados
        this.consecutivosPaginados = new PaginadorModel(this);

        // se configura la localidad para fechas
        this.es = Util.getCalendarLocale();
    }

    /**
     * Metodo que es invocado por el paginador de la tabla
     * @param paginador , es el modelo del paginador
     */
    public paginar(paginador: PaginadorModel): void {

        if (!this.init) {
            this.getInit(paginador);
        } else {
            // se muestra el modal de carga
            this.utilService.displayLoading(true);

            // se invoca el servicio para generar el nuevo consecutivo
            this.init.filtro.paginador = paginador.datos;
            this.correspondenciaService.getConsecutivosSolicitados(this.init.filtro).subscribe(
                data => {

                    // se configuran el DTO del response
                    let response = data.json();

                    // se configura los registros en el paginador
                    this.consecutivosPaginados.configurarRegistros(response);

                    // se cierra el modal de carga
                    this.utilService.displayLoading(false);
                },
                error => {
                    this.showErrorSistema(error);
                }
            );
        }
    }

    /**
     * Metodo que permite obtener los datos iniciales del modulo
     * 
     * @param paginador , es el modelo del paginador
     */
    private getInit(paginador: PaginadorModel): void {

        // se muestra el modal de carga
        this.utilService.displayLoading(true);

        // se invoca el servicio para obtener los datos iniciales
        this.correspondenciaService.getDatosInitConsecutivoSolicitados(paginador.datos).subscribe(
            data => {
                // se configura el DTO que contiene los datos iniciales
                this.init = data.json();

                this.init.filtro.fechaInicial = new Date(this.init.filtro.fechaInicial);
                this.init.filtro.fechaFinal = new Date(this.init.filtro.fechaFinal);


                this.consecutivosPaginados.configurarRegistros(this.init.consecutivos);

                this.init.consecutivos = null;

                this.autocompleteUsers.items = this.init.usuarios;
                this.autocompleteUsers.inputDIV = this.userAutocomplete;
                this.autocompleteUsers.inputID = null;


                // se cierra el modal de carga
                this.utilService.displayLoading(false);
            },
            error => {
                this.showErrorSistema(error);
            }
        );
    }
}