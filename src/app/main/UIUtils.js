import _ from '@lodash';
import { amber, blue, brown, green, red } from '@material-ui/core/colors';

// TODO: PARAMETRIZAR ESTE DATO;
export const COTIZACION_DOLLAR = 6600;

export const languageConfig = {
    header: {
        actions: ''
    },
    body: {
        emptyDataSourceMessage: 'Sin datos'
    },
    toolbar: {
        searchPlaceholder: 'Buscar',
        searchTooltip: 'Buscar'
    },
    pagination: {
        nextTooltip: 'Siguiente',
        nextAriaLabel: 'Siguiente',
        previousTooltip: 'Anterior',
        previousAriaLabel: 'Anterior',
        labelDisplayedRows: '{from}-{to} de {count}',
        labelRowsSelect: 'registros',
        lastTooltip: 'Última página',
        lastAriaLabel: 'Última página',
        firstTooltip: 'Primera página',
        firstAriaLabel: 'Primera página'
    }
};

export const sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({ data: 'test' }), time || 2000);
    });
};

export const agregarRolesARutas = (rutas, usuario) => {
    const _rutas = rutas.filter(r => {
        const isVisible = r.settings && r.settings.layout.config.isVisible;
        if (_.isUndefined(isVisible)) {
            return true;
        }
        const roles = (usuario && usuario.roles) || [];
        const tieneRol = isVisible(roles);
        return tieneRol;
    });
    return _rutas;
};

export const agregarRolesARutasDeNavigationBar = (navigation, user) => {
    const _navigation = [...navigation];
    const roles = (user && user.roles) || [];
    _navigation.forEach(navItem => {
        let children = [];
        if (!navItem.children) {
            return;
        }
        navItem.children.forEach(child => {
            const isVisible = child.isVisible;
            if (_.isUndefined(isVisible) || isVisible(roles)) {
                children = [
                    ...children,
                    child
                ];
            }
        });
        navItem.children = children;
    });
    return _navigation;
};

export const separadorDeMiles = (numero) => {
    if (!numero || !_.isNumber(numero)) {
        return '';
    }
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const construirParametrosDePaginacion = (query, endPoint) => {
    let url = endPoint;
    url += '?porPagina=' + query.pageSize;
    url += '&paginaActual=' + query.page;
    if (query.search) {
        url += '&busqueda=' + query.search;
    }
    if (query.orderBy) {
        url += '&ordenadoPor=' + query.orderBy.field + ';' + query.orderDirection;
    }
    return url;
};

export const EstadoNegociacion = {
    CREADO: 'CREADO',
    PENDIENTE: 'PENDIENTE',
    APROBADO_POR_ANALISTA: 'APROBADO_POR_ANALISTA',
    CONDICIONADO_POR_ANALISTA: 'CONDICIONADO_POR_ANALISTA',
    TOTALMENTE_APROBADO: 'TOTALMENTE_APROBADO',
    RECHAZADO: 'RECHAZADO'
};

export const estadosDeNegociacion = [
    {
        value: EstadoNegociacion.PENDIENTE,
        label: 'Sin revisar ❗'
    }, {
        value: EstadoNegociacion.APROBADO_POR_ANALISTA,
        label: 'Aprobado por Analista ✅'
    }, {
        value: EstadoNegociacion.CONDICIONADO_POR_ANALISTA,
        label: 'Condicionado por Analista ⚠️'
    }, {
        value: EstadoNegociacion.TOTALMENTE_APROBADO,
        label: 'Totalmente Aprobado ✅✅'
    }, {
        value: EstadoNegociacion.RECHAZADO,
        label: 'Rechazado 👎'
    }, {
        value: EstadoNegociacion.CREADO,
        label: 'Sin completar form. 🧐'
    }
];

export const MONEDA = {
    DOLLAR: 'DOLLAR',
    GUARANIES: 'GUARANIES'
};

export const monedas = [
    {
        value: MONEDA.DOLLAR,
        label: 'Dólar ($)'
    }, {
        value: MONEDA.GUARANIES,
        label: 'Guaraníes (₲)'
    }
];

export const cantidadDePagos = [
    {
        value: 1,
        label: '1'
    }, {
        value: 2,
        label: '2'
    }, {
        value: 3,
        label: '3'
    }, {
        value: 4,
        label: '4'
    }, {
        value: 5,
        label: '5'
    }, {
        value: 6,
        label: '6'
    }, {
        value: 7,
        label: '7'
    }, {
        value: 8,
        label: '8'
    }, {
        value: 9,
        label: '9'
    }, {
        value: 10,
        label: '10'
    }, {
        value: 11,
        label: '11'
    }, {
        value: 12,
        label: '12'
    }
];

export const categorias = [
    {
        value: 0,
        label: 'Todos'
    }, {
        value: 1,
        label: 'Categría 1'
    }, {
        value: 2,
        label: 'Categría 2'
    }, {
        value: 3,
        label: 'Categría 3'
    }, {
        value: 4,
        label: 'Categría 4'
    }, {
        value: 5,
        label: 'Categría 5'
    }
];

export const Departamento = {
    VISITADOR: 'VISITADOR',
    ANALISTA: 'ANALISTA',
    GERENCIA_INTELIGENCIA_DE_NEGOCIOS: 'GERENCIA_INTELIGENCIA_DE_NEGOCIOS',
    GERENCIA_MEDICA: 'GERENCIA_MEDICA',
    GERENCIA_COMERCIAL: 'GERENCIA_COMERCIAL',
    GERENCIA_GENERAL: 'GERENCIA_GENERAL'
};

export const ConceptoDeAporte = {
    ECONOMICO: 'ECONOMICO',
    BECA: 'BECA',
    TERMO: 'TERMO',
    PERSONALIZADO: 'PERSONALIZADO'
};

export const Renovacion = {
    SI: true,
    NO: false
};

export const Condicionado = {
    SI: true,
    NO: false
};

export const FormaDePago = {
    CHEQUE_A_LA_ORDEN: 'CHEQUE_A_LA_ORDEN',
    CHEQUE_AL_PORTADOR: 'CHEQUE_AL_PORTADOR',
    CUENTA_BANCARIA: 'CUENTA_BANCARIA'
};

export const ExcepcionDeAporte = {
    ADELANTO: 'ADELANTO',
    EXTENSION: 'EXTENSION',
    NINGUNO: 'NINGUNO'
};

export const conceptosDeAporte = [
    { value: ConceptoDeAporte.ECONOMICO, label: 'Solicitud de apoyo económico' },
    { value: ConceptoDeAporte.BECA, label: 'Solicitud de Beca' },
    { value: ConceptoDeAporte.TERMO, label: 'Solicitud de termo' }
];

export const renovacion = [
    { value: Renovacion.SI, label: 'Sí es Renovación' },
    { value: Renovacion.NO, label: 'No es Renovación' }
];

export const formaDePago = [
    { value: FormaDePago.CHEQUE_A_LA_ORDEN, label: 'Cheque a la orden' },
    { value: FormaDePago.CHEQUE_AL_PORTADOR, label: 'Cheque al portador' },
    { value: FormaDePago.CUENTA_BANCARIA, label: 'Cuenta bancario' }
];

export const excepcionDeAporte = [
    { value: ExcepcionDeAporte.ADELANTO, label: 'Adelanto' },
    { value: ExcepcionDeAporte.EXTENSION, label: 'Extensión' },
    { value: ExcepcionDeAporte.NINGUNO, label: 'Ninguno' }
];

export const condicionado = [
    { value: Condicionado.SI, label: 'Sí está Condicionado' },
    { value: Condicionado.NO, label: 'No está Condicionado' }
];

export const Termo = {
    TERMO_AGUA_FRIA: 'TERMO_AGUA_FRIA',
    TERMO_AGUA_CALIENTE: 'TERMO_AGUA_CALIENTE',
    HOPPY_INOX: 'HOPPY_INOX',
    TERMO_INOX_1_5_L: 'TERMO_INOX_1_5_L',
    TERMO_INOX_2_5_L: 'TERMO_INOX_2_5_L'
};

export const Metodo = {
    CLOSE_UP: 'CLOSE UP',
    CATCHMENT: 'CATCHMENT'
};

export const ColorDeForrado = {
    MARRON: 'MARRON',
    VERDE: 'VERDE',
    AZUL: 'AZUL'
};

export const TipoDeMetodo = {
    SOLO_MEDICION: 'SOLO MEDICION',
    MEDICION_Y_DESEMBOLSO: 'MEDICION Y DESEMBOLSO',
    MEDICION_Y_DESEMBOLSO_DIFERENCIADO: 'MEDICION Y DESEMBOLSO DIFERENCIADO'
};

export const Periodo = {
    MENSUAL: 'MENSUAL',
    BIMESTRAL: 'BIMESTRAL',
    TRIMESTRAL: 'TRIMESTRAL',
    CUATRIMESTRAL: 'CUATRIMESTRAL',
    SEMESTRAL: 'SEMESTRAL',
    ANUAL: 'ANUAL'/*,
    UNICO_PAGO: 'UNICO_PAGO'*/
};
export const opcionesDeNegociacion = [
    {
        value: EstadoNegociacion.APROBADO_POR_ANALISTA,
        name: EstadoNegociacion.APROBADO_POR_ANALISTA,
        label: 'Aprobar',
        color: green['500']
    }, {
        value: EstadoNegociacion.CONDICIONADO_POR_ANALISTA,
        name: EstadoNegociacion.CONDICIONADO_POR_ANALISTA,
        label: 'Condicionado',
        color: amber['500']
    }, {
        value: EstadoNegociacion.RECHAZADO,
        name: EstadoNegociacion.RECHAZADO,
        label: 'Rechazar',
        color: red['500']
    }, {
        value: EstadoNegociacion.TOTALMENTE_APROBADO,
        name: EstadoNegociacion.TOTALMENTE_APROBADO,
        label: 'Totalmente Aprob.',
        color: blue['500']
    }
];

export const Dias = {
    DOMINGO: 'DOMINGO',
    LUNES: 'LUNES',
    MARTES: 'MARTES',
    MIERCOLES: 'MIERCOLES',
    JUEVES: 'JUEVES',
    VIERNES: 'VIERNES',
    SABADO: 'SABADO'
};

export const opcionesDiasDeAtencion = [
    {
        value: Dias.LUNES,
        name: Dias.LUNES,
        label: 'Lu',
    }, {
        value: Dias.MARTES,
        name: Dias.MARTES,
        label: 'Ma',
    }, {
        value: Dias.MIERCOLES,
        name: Dias.MIERCOLES,
        label: 'Mier',
    }, {
        value: Dias.JUEVES,
        name: Dias.JUEVES,
        label: 'Ju',
    }, {
        value: Dias.VIERNES,
        name: Dias.VIERNES,
        label: 'Vi',
    }, {
        value: Dias.SABADO,
        name: Dias.SABADO,
        label: 'Sa',
    }, {
        value: Dias.DOMINGO,
        name: Dias.DOMINGO,
        label: 'Dom',
    }
];

export const metodos = [
    {
        value: Metodo.CATCHMENT,
        name: Metodo.CATCHMENT,
        label: 'Catchment'
    },
    {
        value: Metodo.CLOSE_UP,
        name: Metodo.CLOSE_UP,
        label: 'Close Up'
    }
];

export const periodos = [
    {
        value: Periodo.MENSUAL,
        name: Periodo.MENSUAL,
        label: 'Mensual'
    },
    {
        value: Periodo.BIMESTRAL,
        name: Periodo.BIMESTRAL,
        label: 'Bimestral'
    },
    {
        value: Periodo.TRIMESTRAL,
        name: Periodo.TRIMESTRAL,
        label: 'Trimestral'
    },
    
    {
        value: Periodo.CUATRIMESTRAL,
        name: Periodo.CUATRIMESTRAL,
        label: 'Cuatrimestral'
    },
    {
        value: Periodo.SEMESTRAL,
        name: Periodo.SEMESTRAL,
        label: 'Semestral'
    },
    {
        value: Periodo.ANUAL,
        name: Periodo.ANUAL,
        label: 'Anual'
    }
    /*,
    {
        value: Periodo.UNICO_PAGO,
        name: Periodo.UNICO_PAGO,
        label: 'Unico Pago'
    }*/
];

export const termos = [
    {
        value: Termo.TERMO_AGUA_FRIA,
        name: Termo.TERMO_AGUA_FRIA,
        label: 'Termo Agua Fría',
        costo: 120000
    }, {
        value: Termo.TERMO_AGUA_CALIENTE,
        name: Termo.TERMO_AGUA_CALIENTE,
        label: 'Termo Agua Caliente',
        costo: 120000
    }, {
        value: Termo.HOPPY_INOX,
        name: Termo.HOPPY_INOX,
        label: 'Hoppy Inox',
        costo: 50000
    }, {
        value: Termo.TERMO_INOX_1_5_L,
        name: Termo.TERMO_INOX_1_5_L,
        label: 'Termo Inox 1.5 L',
        costo: 140000
    }, {
        value: Termo.TERMO_INOX_2_5_L,
        name: Termo.TERMO_INOX_2_5_L,
        label: 'Termo Inox 2.5 L',
        costo: 170000
    }
];

export const colorDeForrado = [
    {
        value: ColorDeForrado.MARRON,
        name: ColorDeForrado.MARRON,
        label: 'Marrón',
        color: brown['500']
    }, {
        value: ColorDeForrado.AZUL,
        name: ColorDeForrado.AZUL,
        label: 'Azul',
        color: blue['500']
    }, {
        value: ColorDeForrado.VERDE,
        name: ColorDeForrado.VERDE,
        label: 'Verde',
        color: green['500']
    }
];

export const tipoDeMetodo = [
    {
        value: TipoDeMetodo.SOLO_MEDICION,
        name: TipoDeMetodo.SOLO_MEDICION,
        label: 'Medición'
    }, {
        value: TipoDeMetodo.MEDICION_Y_DESEMBOLSO,
        name: TipoDeMetodo.MEDICION_Y_DESEMBOLSO,
        label: 'Medición y Desembolso'
    }, {
        value: TipoDeMetodo.MEDICION_Y_DESEMBOLSO_DIFERENCIADO,
        name: TipoDeMetodo.MEDICION_Y_DESEMBOLSO_DIFERENCIADO,
        label: 'Medición y Desembolso Diferenciado'
    }
];

export const getColorEstado = (estado) => {
    if (estado === EstadoNegociacion.CONDICIONADO_POR_ANALISTA) {
        return amber['500'];
    } else if (estado === EstadoNegociacion.APROBADO_POR_ANALISTA) {
        return green['500'];
    } else if (estado === EstadoNegociacion.RECHAZADO) {
        return red['500'];
    } else if (estado === EstadoNegociacion.CREADO) {
        return red['500'];
    } else {
        return '#000000';
    }
};

export const getNombreYMatriculaDeMedico = rowData => {
    let nombre = rowData.medico ? rowData.medico.nombre : '';
    let matricula = rowData.medico ? rowData.medico.matricula : '';
    return obtenerNombreYMetaDato(nombre, matricula);
};

export const obtenerNombreYMetaDato = (nombre, metaDato) => {
    const nombreArray = nombre.split(' ');
    let index0 = 0;
    let index1 = 0;
    if (nombreArray.length >= 4) {
        index0 = 0;
        index1 = nombreArray.length - 2;
    } else if (nombreArray.length > 1) {
        index0 = 0;
        index1 = nombreArray.length - 1;
    }
    if (index0 !== index1) {
        nombre = `${nombreArray[index0]} ${nombreArray[index1]}`;
    } else {
        nombre = `${nombreArray[index0]}`;
    }
    return { nombre, metaDato };
};

export const getNombreYLegajoDeVisitador = rowData => {
    const registro = rowData.registro;
    let nombre = registro ? registro.visitador : '';
    let matricula = registro ? registro.legajoVisitador : '';
    return obtenerNombreYMetaDato(nombre, matricula);
};

function ping() {


    let resultado;
    let url = IP_BASE_PRODUCCION + '/login/ping';
    //let url = URL_BASE_DESARROLLO_LOCAL_SERVIDOR_TOMCAT_SPRING_BOOT+'/login/ping';
    //let url = URL_BASE_JOSE+'/login/ping';
    var req = new XMLHttpRequest();
    req.open('GET', url, false);

    try {
        req.send(null);
    } catch (e) {

    }

    if (req.status == 200) {
        resultado = IP_BASE_PRODUCCION;
        //resultado = URL_BASE_DESARROLLO_LOCAL_SERVIDOR_TOMCAT_SPRING_BOOT;
        //resultado = URL_BASE_JOSE;
    }
    else {
        //resultado = URL_BASE_PRODUCCION;
    }

    return resultado;
}

export const URL_BASE_JOSE = 'http://192.168.2.93:8080';
export const URL_BASE_MANU = 'http://192.168.2.6:8080/indufar-prospeccion-back';
export const URL_BASE_PRODUCCION = URL_BASE_MANU; //'http://apps.indufar.com.py:93/indufar-prospeccion-back';
export const IP_BASE_PRODUCCION = 'http://192.168.2.214:8080/indufar-prospeccion-back';
export const URL_BASE_DESARROLLO_LOCAL_SERVIDOR_TOMCAT_SPRING_BOOT = 'http://localhost:8080';
export const URL_BASE_DESARROLLO_LOCAL_SERVISOR_WILDFLY = 'http://localhost:8080/indufar-prospeccion-back';
export let URL_BASE = URL_BASE_MANU; //ping();
export const END_POINT_MEDICOS = URL_BASE + '/medicos';
export const END_POINT_APM = URL_BASE + '/objetivos';
export const END_POINT_UBICACIONES = URL_BASE + '/ubicaciones';
export const END_POINT_PRODUCTOS_DE_PROSPECTO = URL_BASE + '/productos-de-prospecto';
export const END_POINT_NEGOCIACIONES = URL_BASE + '/negociaciones';
export const END_POINT_REGISTROS = URL_BASE + '/registros';
export const END_POINT_ESTADISTICAS = URL_BASE + '/estadisticas';
export const END_POINT_TAM = URL_BASE + '/tams';

export const DESDE = 'DESDE';

export const HASTA= 'HASTA';
