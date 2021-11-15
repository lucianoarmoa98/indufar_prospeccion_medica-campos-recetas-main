export const RECETA_GET_DATA = 'RECETA_GET_DATA';
export const RECETA_SET_DATA = 'RECETA_SET_DATA';
export const RECETA_EDIT_DATA = 'RECETA_EDIT_DATA';
export const RECETA_SUBMIT = 'RECETA_SUBMIT';
export const RECETA_SUBMIT_CALIGRAFIA = 'RECETA_SUBMIT_CALIGRAFIA';
export const RECETA_SUBMIT_SUCCESS = 'RECETA_SUBMIT_SUCCESS';
export const RECETA_SUBMIT_FAIL = 'RECETA_SUBMIT_FAIL';
export const RECETA_FORM_RESET = 'RECETA_FORM_RESET';

export const RECETA_GET_MEDICOS = 'RECETA_GET_MEDICOS';
export const RECETA_SET_MEDICOS = 'RECETA_SET_MEDICOS';
export const RECETA_SET_MEDICO = 'RECETA_SET_MEDICO';

export const RECETA_GET_VISITADOR = 'RECETA_GET_VISITADOR';
export const RECETA_SET_VISITADOR = 'RECETA_SET_VISITADOR';

export const RECETA_GET_TAMS = 'RECETA_GET_TAMS';
export const RECETA_SET_TAMS = 'RECETA_SET_TAMS';
export const RECETA_SET_TAM = 'RECETA_SET_TAM';

export const RECETA_GET_PRODUCTOS = 'RECETA_GET_PRODUCTOS';
export const RECETA_SET_PRODUCTOS = 'RECETA_SET_PRODUCTOS';
export const RECETA_SET_PRODUCTO = 'RECETA_SET_PRODUCTO';

export const RECETA_SET_MENSAJE = 'RECETA_SET_MENSAJE';
export const RECETA_MOSTRAR_TOAST = 'RECETA_MOSTRAR_TOAST';

export const RECETA_DESACTIVAR = 'RECETA_DESACTIVAR';

export const RECETA_LISTA_CHANGE_PAGE = 'RECETA_LISTA_CHANGE_PAGE';
export const RECETA_LISTA_CHANGE_QUANTITY_PER_PAGE = 'RECETA_LISTA_CHANGE_QUANTITY_PER_PAGE';
export const RECETA_LISTA_SET_VALUE_SEARCH = 'RECETA_LISTA_SET_VALUE_SEARCH';

export const listChangePage = page => ({
  type: RECETA_LISTA_CHANGE_PAGE,
  payload: {
    page
  }
});

export const listChangeQuantityPerPage = quantityPerPage => ({
  type: RECETA_LISTA_CHANGE_QUANTITY_PER_PAGE,
  payload: {
    quantityPerPage
  }
});

export const setSearchValue = value => ({
  type: RECETA_LISTA_SET_VALUE_SEARCH,
  payload: {
    value
  }
});


export const getTams = (data) => ({
    type: RECETA_GET_TAMS,
    payload: {
        data
    }
});

export const setTams = (tams) => ({
    type: RECETA_SET_TAMS,
    payload: {
        tams
    }
});


export const setTam = (tam) => ({
    type: RECETA_SET_TAM,
    payload: {
        tam
    }
});

export const setMensaje = (data) => ({
    type: RECETA_SET_MENSAJE,
    payload: {
        data
    }
});

export const setMostrarToast = (data) => ({
    type: RECETA_MOSTRAR_TOAST,
    payload: {
        data
    }
});

export const getVisitador = (data) => ({
    type: RECETA_GET_VISITADOR,
    payload: {
        data
    }
});

export const setVisitador = (medicos) => ({
    type: RECETA_SET_VISITADOR,
    payload: {
        medicos
    }
});


export const getMedicos = (data) => ({
    type: RECETA_GET_MEDICOS,
    payload: {
        data
    }
});

export const setMedicos = (medicos) => ({
    type: RECETA_SET_MEDICOS,
    payload: {
        medicos
    }
});

export const setMedico = (medico) => ({
    type: RECETA_SET_MEDICO,
    payload: {
        medico
    }
});

export const getProductos = (data) => ({
    type: RECETA_GET_PRODUCTOS,
    payload: {
        data
    }
});

export const setProductos = (productos) => ({
    type: RECETA_SET_PRODUCTOS,
    payload: {
        productos
    }
});


export const setProducto = (producto) => ({
    type: RECETA_SET_PRODUCTO,
    payload: {
        producto
    }
});


export const desactivarReceta = (idReceta, history) => ({
    type: RECETA_DESACTIVAR,
    payload: {
        idReceta,
        history
    }
});





export const getReceta = (idReceta) => ({
    type: RECETA_GET_DATA,
    payload: {
        idReceta
    }
});

export const setReceta = (data) => ({
    type: RECETA_SET_DATA,
    payload: {
        data
    }
});

export const editarReceta = (idReceta, body) => ({
    type: RECETA_EDIT_DATA,
    payload: {
        idReceta,
        body
    }
});

export const formSubmit = (body) => ({
    type: RECETA_SUBMIT,
    payload: {
        body
    }
});

export const formSubmitCaligrafia = (body) => ({
    type: RECETA_SUBMIT_CALIGRAFIA,
    payload: {
        body
    }
});

export const formSubmitSuccess = () => ({
    type: RECETA_SUBMIT_SUCCESS
});

export const formSubmitFail = () => ({
    type: RECETA_SUBMIT_FAIL
});

export const resetForm = () => ({
    type: RECETA_FORM_RESET
});
