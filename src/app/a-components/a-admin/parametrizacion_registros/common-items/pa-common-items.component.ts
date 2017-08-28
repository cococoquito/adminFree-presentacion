import { ModuloItemDTO } from './../../../../c-model/a-admin/seguridad/ModuloItemDTO';
import { Component, OnInit, Input } from '@angular/core';

/**
 * Componente para las parametrizaciones iniciales de los registros comunes,
 * tales registros que tienen solamente (NOMBRE, ESTADO)
 */
@Component({
    selector: 'pa-common-items',
    templateUrl: './pa-common-items.component.html'
})
export class PaCommonItemsComponent implements OnInit {

    /** Contiene el tipo de parametrizacion que se va administrar*/
    @Input()
    public item: ModuloItemDTO;

    /**
     * PostConstructor que permite inicializar las variables del component
     */
    ngOnInit(): void { }
}