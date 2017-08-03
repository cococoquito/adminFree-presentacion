import { ItemsMenuDTO } from './ItemsMenuDTO';

/**
 * Clase que representa las propiedades de cada modulo
 */
export class ModulosDTO {

    /** es el id del modulo */
    consecutivo: number;

    /** es el nombre del modulo */
    nombre: string;

    /** son los items del menu */
    itemsMenu: Array<ItemsMenuDTO>;
}