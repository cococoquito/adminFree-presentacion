import { CommonVO } from './CommonVO';

/**
 * Clase wraper para la actualizaciones de los items parametricos
 * 
 * @author Carlos Andres Diaz
 */
export class ActualizacionItemsDTO {

    /** Son los items que que han sido modificados para actualizar **/
    public items: Array<CommonVO>;

    /** Identifica a que tabla parametrica va relacionado a los items actualizar **/
    public idItem: number;
}