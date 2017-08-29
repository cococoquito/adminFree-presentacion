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

    /** Es el item seleccionado por el usuario*/
    @Input()
    public item: ModuloItemDTO;

    /** Es el modulo del item seleccionado por el usuario*/
    @Input()
    public modulo: ModuloDTO;

    /** Lista de items parametrizados en el sistema, estos se visualiza en la tabla*/
    private items: Array<CommonVO>;

    /**
    * Constructor del componente para la administracion de los USUARIOS
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
}