/**
 * DTO que representa las propiedades comunes tales como ID, NOMBRE
 */
export class CommonDTO {

    /** identificador del registro */
    id: number;

    /** nombre que representa el registro */
    nombre: string;

    /** identifica que tipo de registro es (TIPO VIVIENDAS, TIPOS CUENTAS, TIPOS VEHICULOS etc) */
    tipoRegistro: number;
}