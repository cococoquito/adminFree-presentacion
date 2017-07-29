/**
 * Clase que tiene la informacion del item de cada modulo
 * esto se utiliza para el menu de admin-free
 */
export class ModuloItemRes {

    /** identificador del item */
    idItem: number;

    /** nombre del Item, se utiliza para el menu */
    nombreItem: string;

    /** es la URL del router para el redireccionamiento */
    urlRouter: string;

    /** 
     * indica que privilegios especifico tiene para este item, tales como visualizacion de botones
     * ejecutacion de eventos, llega un string con nros separados por comas 1,2,3
     */
    privilegiosEspecificos: string;
}