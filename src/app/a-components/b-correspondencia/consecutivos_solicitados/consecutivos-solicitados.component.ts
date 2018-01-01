import { Util } from './../../../z-util/Util';
import { AutocompleteUtil } from './../../../z-util/AutoComplete-util';
import { ComponentCommon } from './../../../z-util/Component-common';
import { AdministradorService } from './../../../b-service/a-admin/administrador.service';
import { CorrespondenciaService } from './../../../b-service/b-correspondencia/correspondencia.service';
import { AlertService } from './../../../b-service/z-common/alert.service';
import { UtilitarioService } from './../../../b-service/z-common/utilitario.service';
import { PaginadorModel } from './../../y-directivas/paginador/PaginadorModel';
import { UsuarioLoginDTO } from './../../../c-model/b-seguridad/UsuarioLoginDTO';
import { ConsecutivoSolicitadoFiltroDTO } from './../../../c-model/c-correspondencia/consecutivos_solicitados/ConsecutivoSolicitadoFiltroDTO';
import { InitConsecutivoSolicitadosDTO } from './../../../c-model/c-correspondencia/consecutivos_solicitados/InitConsecutivoSolicitadosDTO';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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

    /**DTO que contiene los datos iniciales de este submodulo*/
    private init: InitConsecutivoSolicitadosDTO;

    /**Paginador model para la tabla de consecutivos solicitados*/
    private consecutivosPaginados: PaginadorModel;

    /**Es el modelo del componente de autocomplete para los usuarios*/
    private autocompleteUsers: AutocompleteUtil;

    /**Es el filtro de busqueda que se envia al servicio*/
    private filtro: ConsecutivoSolicitadoFiltroDTO;

    /**Los componentes de filtro de busqueda apunta a este clone*/
    private filtroClone: ConsecutivoSolicitadoFiltroDTO;

    /**DTO que contiene los datos del usuario autenticado en el sistema*/
    private user: UsuarioLoginDTO;

    /**Es la referencia del componente autocomplete de usuarios*/
    @ViewChild('user')
    private userAutocomplete: ElementRef;

    /**
     * Constructor del componente de consecutivos de correspondencia solicitados
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

        // Se consultan los datos parametricos iniciales de este submodulo
        this.getInit();
    }

    /**
     * Metodo que soporta el evento click del boton Filtrar, donde
     * es invocado desde el modelo del paginador
     * 
     * @param paginador , es el modelo del paginador
     */
    public filtrar(paginador: PaginadorModel): void {

        // se configura el filtro de acuerdo al filtro busqueda ingresado
        this.filtro = new ConsecutivoSolicitadoFiltroDTO();
        this.filtro.clone(this.filtroClone);

        // se esconde la ventana de alert
        this.alertService.hiddenAlert();
    }

    /**
     * Metodo que soporta el evento click del boton Limpiar, donde
     * es invocado desde el modelo del paginador
     * 
     * @param paginador , es el modelo del paginador
     */
    public limpiarFiltro(paginador: PaginadorModel): void {

        // se inicializa los filtros de busqueda
        this.inicializarFiltroBusqueda();

        // se esconde la ventana de alert
        this.alertService.hiddenAlert();
    }

    /**
     * Metodo que es invocado por el paginador de la tabla
     * 
     * @param paginador , es el modelo del paginador
     */
    public paginar(paginador: PaginadorModel): void {

        // Para la primera invocacion el paginador NO debe ejecutar el
        // servicio, el init ya tiene los consecutivos iniciales
        if (this.consecutivosPaginados.esPrimerInvocacion) {
            this.consecutivosPaginados.configurarRegistros(this.init.consecutivos);
            this.init.consecutivos = null;
            this.consecutivosPaginados.esPrimerInvocacion = false;
            return;
        }

        // se muestra el modal de carga
        this.utilService.displayLoading(true);

        // se configura el paginador para el filtro de busqueda
        this.filtro.paginador = paginador.datos;

        // se procede a consultar los consecutivos solicitados de acuerdo al filtro busqueda
        this.correspondenciaService.getConsecutivosSolicitados(this.filtro).subscribe(
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

    /**
     * Metodo que permite obtener los datos parametricos iniciales del submodulo
     */
    private getInit(): void {

        // se muestra el modal de carga
        this.utilService.displayLoading(true);

        // se invoca el servicio para obtener los datos iniciales
        this.correspondenciaService.getDatosInitConsecutivoSolicitados().subscribe(
            data => {
                // se configura el DTO que contiene los datos iniciales
                this.init = data.json();

                // se procede a configurar las variables globales
                this.configurarInit();

                // se cierra el modal de carga
                this.utilService.displayLoading(false);
            },
            error => {
                this.showErrorSistema(error);
            }
        );
    }

    /**
     * Metodo que permite configurar las variables globales
     */
    private configurarInit(): void {

        // se configura la localidad para fechas
        this.es = Util.getCalendarLocale();

        // se configura los datos del usuario autenticado
        this.user = this.administradorService.getUsuarioAutenticado();

        // se configura el modelo para el autcomplete de usuarios
        this.autocompleteUsers = new AutocompleteUtil();
        setTimeout(() => {
            this.autocompleteUsers.items = this.init.usuarios;
            this.autocompleteUsers.inputDIV = this.userAutocomplete;
            this.autocompleteUsers.inputID = null;
        }, 100)

        // se crea el paginador para consultar los consecutivos solicitados
        this.consecutivosPaginados = new PaginadorModel(this);

        // se inicializa los filtros de busqueda
        this.inicializarFiltroBusqueda();
    }

    /**
     * Metodo que permite inicializar los filtros de busqueda
     */
    private inicializarFiltroBusqueda(): void {

        // filtro que se envia al servicio
        this.filtro = new ConsecutivoSolicitadoFiltroDTO();
        this.filtro.clone(this.init.filtro);

        // filtro que es utilizado por los componentes de busqueda
        this.filtroClone = new ConsecutivoSolicitadoFiltroDTO();
        this.filtroClone.clone(this.init.filtro);
    }
}