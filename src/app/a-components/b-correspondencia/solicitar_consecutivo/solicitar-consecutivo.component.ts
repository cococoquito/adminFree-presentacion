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

    /**lista de tipos de nomenclaturas parametrizados en el sistema*/
    private nomenclaturas: Array<NomenclaturasConsecutivosVO>;

    /**Es la nomenclatura seleccionado para solicitar un consecutivo*/
    private nomenclaturaSeleccionada: NomenclaturasConsecutivosVO;

    /**
     * Constructor del componente para la administracion de los USUARIOS
     * @param utilService, service con las funciones utilitarias
     * @param alertService, service para la comunicacion del componente de mensaje de alerta
     * @param administradorService, contiene los servicios administrativo
     */
    constructor(
        protected utilService: UtilitarioService,
        protected alertService: AlertService,
        private administradorService: AdministradorService) {
        super(utilService, alertService);
    }

    /**
     * PostConstructor que permite inicializar las variables del component
     */
    ngOnInit(): void {
        // se obtiene las nomenclaturas parametrizada en el sistema
        this.getNomenclaturas();
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
     * Metodo que permite obtener las nomenclaturas parametrizadas en el sistema
     */
    private getNomenclaturas(): void {

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
}