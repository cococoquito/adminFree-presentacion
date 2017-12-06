/**
 * Clase que mapea los atributos de un consecutivo de correspondencia
 * 
 * @author Carlos Andres Diaz
 */
export class ConsecutivoCorrespondenciaDTO {

    /** Representa el identificador del consecutivo **/
    public id: number;

    /** Representa el identificador de la nomenclatura **/
    public idNomenclatura: number;

    /** Representa el identificador del funcionario quien elabora el documento **/
    public idFuncionario: number;

    /** Es el nombre del funcionario, se utiliza para el autocomplete **/
    public nombreFuncionario: string;

    /** Representa la fecha de elaboracion del documento **/
    public fechaElaboracion: Date;

    /** Representa la fecha en la que el SAC radico la solicitud **/
    public fechaSAC: Date;

    /** Representa el Numero que asigna el SAC para identificar la solicitud **/
    public nroSAC: string;

    /** Nombre de la entidad a quien se va dirigir el documento **/
    public destinatario: string;

    /** Resumen donde se especifica lo que solicita el ciudadano **/
    public asunto: string;
}