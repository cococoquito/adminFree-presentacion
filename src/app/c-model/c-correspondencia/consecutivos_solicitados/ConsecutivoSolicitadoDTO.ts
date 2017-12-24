/**
 * Clase que mapea los atributos de un consecutivo solicitado
 * 
 * @author Carlos Andres Diaz
 */
export class ConsecutivoSolicitadoDTO {

    /** Representa el identificador del consecutivo **/
    public id: number;

    /** Nombre de la nomenclatura asociada al consecutivo **/
    public nomenclatura: string;

    /** Numero del conseutivo generado por el sistema **/
    public consecutivo: string;

    /** Usuario quien solicito el consecutivo **/
    public usuarioSolicito: string;

    /** Fecha en la que solicitaron el consecutivo **/
    public fechaSolicitud: string;

    /** Estado en la que se encuentra el consecutivo **/
    public estadoConsecutivo: string;
}