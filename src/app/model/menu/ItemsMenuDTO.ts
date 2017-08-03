import { PrivilegioEspecificoDTO } from './PrivilegioEspecificoDTO';

/**
 * Clase que representa las propiedades de los items de cada modulo
 */
export class ItemsMenuDTO {

    /** representa el idItemMenu del registro **/
    idItemMenu: number;

    /** representa el nombreItem del registro **/
    nombreItem: string;

    /** bandera que indica si el registro fue seleccionado **/
    seleccionado: boolean;

    /** privilegios especificos de cada items **/
    privilegiosEspecificosDTO: Array<PrivilegioEspecificoDTO>;
}