/**
 * Clase wraper para la parametrizacion de los tipos de consecutivos de correspondencia
 * 
 * @author Carlos Andres Diaz
 */
export class NomenclaturasConsecutivosVO {

    /** Identificador del tipo de consecutivo **/
    public idNomenclatura: number;

    /** Es la nomenclatura del tipo de consecutivo(DA, DS, GO) **/
    public nomenclatura: string;

    /** Nombre descriptivo del tipo de consecutivo **/
    public nombre: string;

    /** 1 si la Fecha de elaboracion es editable de lo contrario 0 **/
    public fechaElaboracionEditable: number;

    /** 1 si el campo (Elaborado Por) se debe diligenciar de lo contrario 0 **/
    public elaboradoPorVisible: number;

    /** 1 si el campo (Dirigido A) se debe diligenciar de lo contrario 0 **/
    public dirigidoAVisible: number;

    /** 1 si el campo (Asunto) se debe diligenciar de lo contrario 0 **/
    public asuntoVisible: number;

    /** 1 si el campo (Fecha SAC) se debe diligenciar de lo contrario 0 **/
    public fechaSacVisible: number;

    /** 1 si el campo (Nro SAC) se debe diligenciar de lo contrario 0 **/
    public nroSacVisible: number;

    /** bandera que identifica si la nomenclatura fue modificada **/
    public nomenclaturaModificada: boolean;
}