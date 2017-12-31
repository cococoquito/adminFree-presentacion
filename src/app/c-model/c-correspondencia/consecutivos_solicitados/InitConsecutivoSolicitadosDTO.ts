import { ConsecutivoSolicitadoFiltroDTO } from './ConsecutivoSolicitadoFiltroDTO';
import { CommonVO } from './../../a-admin/parametrizacion/CommonVO';
import { PaginadorResponseDTO } from './../../../a-components/y-directivas/paginador/PaginadorResponseDTO';

/**
 * Clase que contiene los datos iniciales al momento de entrar al submodulo de
 * consecutivos de correspondencia solicitados
 * 
 * @author Carlos andres diaz
 */
export class InitConsecutivoSolicitadosDTO {

    /** Es el reponse inicial de los consecutivos paginados **/
    public consecutivos: PaginadorResponseDTO;

    /** Lista de nomenclaturas a visualizar en el filtro de busqueda **/
    public nomenclaturas: Array<CommonVO>;

    /** Lista de estados a visualizar en el filtro de busqueda **/
    public estados: Array<CommonVO>;

    /** Lista de usuarios a visualizar en el filtro de busqueda **/
    public usuarios: Array<CommonVO>;

    /** DTO que contiene los filtros de busqueda **/
	public filtro: ConsecutivoSolicitadoFiltroDTO;
}