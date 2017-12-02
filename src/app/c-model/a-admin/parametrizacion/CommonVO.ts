/**
 * Clase que representa las propiedades de los items parametricos del sistema
 * 
 * @author Carlos Andres Diaz
 */
export class CommonVO {

    /** representa el identificador del registro **/
    public id: number;

    /** representa el nombre del registro **/
    public nombre: string;

    /** copia de seguridad del nombre **/
    public nombreOrigen: string;

    /** identifica si el registro esta en modo de edicion **/
    public habilitarEdicion: boolean;

    /** identifica si el reistro fue modificado **/
    public itemModificado: boolean;
}