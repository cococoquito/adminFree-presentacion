import { ModuloItemDTO } from './ModuloItemDTO';

/**
 * DTO que contiene los datos del modulo de la aplicacion
 * esto se utiliza para el menu de admin-free
 */
export class ModuloDTO {

    /** identificador del modulo, se utiliza para data-togle del menu */
    idModulo: number;

    /** nombre del modulo, se utiliza para el menu */
    nombreModulo: string;

    /** son los items de este modulo, se visualiza en el menu */
    itemsModulo: Array<ModuloItemDTO>;
}