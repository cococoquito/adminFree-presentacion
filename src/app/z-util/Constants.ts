/** Constante que contiene la URL BASE donde estan los recursos a consumir */
export var URL_BASE: string = "http://localhost:8080/AdminFreeRS/adminfree/";

/** Constante para configurar el valor por default de los select items numerico */
export var SELECT_VALUE_DEFAULT_NUMBER: number = -1;

/** Constantes para los paginadores */
export var ROWS_PAGE_DEFAULT: number = 10;
export var SKIP_DEFAULT: number = 0;
export var ROWS_PER_PAGE_OPTIONS: Array<number> = [10,20,30,40,50];

/** Constantes para el binario de true y false */
export var SI: number = 1;
export var NO: number = 0;

/** Constante para el KEY del user autenticado */
export var KEY_LOCAL_STORE_USER: string = "adminFree-user";

/** Constante para el KEY de la fecha de ingreso */
export var KEY_FECHA_INGRESO: string = "adminFree-fecha-in";

/** Constante para los PATH del routing - inicio */
export var RAIZ: string = "/";
export var HOME: string = "/home";
export var CAMBIO_CLAVE: string = "/cambio_clave";
/** Constante para los PATH del routing - final */

/** Constantes para los estados - inicio*/
export var ESTADO_ACTIVO: number = 1;
export var ESTADO_BORRRADO: number = 2;
/** Constantes para los estados - final*/

/** estilos para el mensaje de ALERT*/
export var STYLE_ERROR_CENTER: string = "alert alert-danger text_center";
export var STYLE_SUCCESS_CENTER: string = "alert alert-success text_center";

/** mensajes para el modulo Adminstracion>>usuario>>admin-role - inicio*/
export var EXITOSO_MSJ_ROL_CREADO: string = "El ROL fue creado exitosamente en el sistema.";
export var EXITOSO_MSJ_ROL_EDITADO: string = "El ROL fue actualizado exitosamente en el sistema.";
export var EXITOSO_MSJ_ROL_ELIMINADO: string = "El ROL fue eliminado exitosamente del sistema.";
export var ERROR_MSJ_PRIVILEGIOS_SELECCIONADO: string = "Debe seleccionar al menos un privilegio para crear el role.";
/** mensajes para el modulo Adminstracion>>usuario>>admin-role - final*/

/** mensajes para el modulo Adminstracion>>usuario>>admin-usuario - inicio*/
export var EXITOSO_MSJ_USER_ELIMINADO: string = "El Usuario fue eliminado exitosamente del sistema.";
export var EXITOSO_MSJ_USUARIO_EDITADO: string = "El usuario fue actualizado exitosamente en el sistema.";
export var EXITOSO_MSJ_USUARIO_CREADO: string = "El usuario fue creado exitosamente en el sistema.";
/** mensajes para el modulo Adminstracion>>usuario>>admin-usuario - final*/

/** mensajes para el modulo Adminstracion>>parametrizaciones - inicio*/
export var ITEM_REGISTRADO_EXITOSAMENTE: string = "El ?1 con el nombre (?2) fue ingresado exitosamente en el sistema.";
export var EXITOSO_ITEM_ELIMINADO: string = "El ?1 con el nombre (?2) fue eliminado exitosamente del sistema.";
export var EXITOSO_ITEMS_UPDATE: string = "Los registros modificados fueron actualizados exitosamente en el sistema.";
export var NOMENCLATURA_CREADA: string = "La nomenclatura (?1) fue ingresado exitosamente en el sistema.";
export var NOMENCLATURA_EDITADA: string = "La nomenclatura (?1) fue actualizada exitosamente en el sistema.";
export var NOMENCLATURA_ELIMINADO: string = "La nomenclatura (?1) fue eliminado exitosamente del sistema.";
/** mensajes para el modulo Adminstracion>>parametrizaciones - final*/

/** mensajes para el modulo Correspondencia>>Solicitar Consecutivo - inicio*/
export var EXITOSO_CONSECUTIVO_GENERADO: string = "El consecutivo fue generado exitosamente por el sistema";
/** mensajes para el modulo Correspondencia>>Solicitar Consecutivo - final*/