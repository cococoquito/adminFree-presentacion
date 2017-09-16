
/**
 * Clase que contiene las propiedades para los campos de ingreso por parte del funcionario
 * al momento de solicitar un consecutivo de correspondencia
 * 
 * @author Carlos Andres Diaz
 */
export class CampoTipoCC {

    /** identificador del campo a digilenciar  **/
    public id: number;

    /** Es el nombre del campo tales como (Fecha elaboracion, elaborado por etc) **/
    public nombreCampo: string;

    /** La descripcion se menciona para que sirve el campo al momento de solicitar el consecutivo **/
    public descripcionCampo: string;

    /** Identifica si el campo es editable **/
    public editable: boolean;

    /** Identifica si el campo debe ser digilenciado por el funcionario  **/
    public diligenciar: boolean;
}