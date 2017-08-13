/** Constante que contiene la URL BASE donde estám los recursos a consumir */
export var URL_BASE: string = "http://localhost:8080/AdminFreeRS/adminfree/";

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

/** mensajes para el modulo Adminstracion>>usuario>>admin-role - inicio*/
export var EXITOSO_MSJ_ROL_CREADO: string = "El ROL fue creado exitosamente en el sistema.";
export var EXITOSO_MSJ_ROL_EDITADO: string = "El ROL fue actualizado exitosamente en el sistema.";
export var EXITOSO_MSJ_ROL_ELIMINADO: string = "El ROL fue eliminado exitosamente del sistema.";
export var ERROR_MSJ_PRIVILEGIOS_SELECCIONADO: string = "Debe seleccionar al menos un privilegio para crear el role.";
/** mensajes para el modulo Adminstracion>>usuario>>admin-role - final*/