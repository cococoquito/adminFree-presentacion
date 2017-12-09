/**
 * Clase que contiene la respuesta del consecutivo generado por el sistema
 * 
 * @author Carlos Andres Diaz
 */
export class ConsecutivoResponseDTO {

    /** Es el nro del consecutivo generado por el sistema **/
    public nroConsecutivo: string;

    /** 
     * Contiene la cantidad de consecutivos que tiene la nomenclatura
     * Relacionada con la solicitud
    **/
    public cantConsecutivos: number;
}