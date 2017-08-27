import { ModuloItemDTO } from './ModuloItemDTO';

/**
 * DTO que contiene las propiedades del modulo del sistema
 * 
 * @author Carlos Andres Diaz
 */
export class ModuloDTO {

    /** Identificador del modulo */
    public idModulo: number;

    /** nombre del modulo */
    public nombreModulo: string;

    /** bandera que identifica si dieron click en el modulo en el menu */
    public cerradoModulo: boolean;

    /** son los items del menu */
    public itemsMenu: Array<ModuloItemDTO>;
}