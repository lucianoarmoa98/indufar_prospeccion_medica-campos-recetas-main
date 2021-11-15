import Negociaciones from './Negociaciones';
import {
	Departamento,
	estadosDeNegociacion,
	getColorEstado,
	getNombreYLegajoDeVisitador,
	getNombreYMatriculaDeMedico,
	monedas,
	separadorDeMiles
} from '../UIUtils';
import React from 'react';
import moment from 'moment';
import Edicion from '../negociacion/Edicion';
import RenderField from '../../../components/Form/RenderField';
import RenderSingleSelect from '../../../components/Form/RenderSingleSelect';
import RenderSingleOption from '../../../components/Form/RenderSingleOption';
import RenderMultipleDatePicker from '../../../components/Form/RenderMultipleDatePicker';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import RenderMultipleOption
	from '../../../components/Form/RenderMultipleOption';
import { blue, cyan } from '@material-ui/core/colors';
import { KeyboardDatePicker } from '@material-ui/pickers';

export const NegociacionesConfig = {
	settings: { layout: { config: {} } },
	routes: [
		{
			path: '/negociaciones',
			component: Negociaciones,
			exact: true
		}, {
			path: '/negociaciones/:id',
			component: Edicion,
			exact: true
		}
	]
};

const fontSize = 12;
export const configuracionDeTabla = {
	titulo: 'Negociaciones',
	columnas: [
		{
			title: 'Fecha',
			field: 'fechaNegociacion',
			render: rowData => {
				return (
					<div style={{ fontSize }}>
						{moment(rowData.fechaNegociacion).format('DD/MM/YY - HH:mm')} hs.
					</div>
				);
			}
		}, {
			title: 'Visitador',
			field: 'legajoVisitador',
			render: rowData => {
				let { nombre, metaDato } = getNombreYLegajoDeVisitador(rowData);
				return (
					<div style={{ fontSize }}>
						<p>
							<span style={{ color: cyan['900'] }}>{nombre} </span>
							<span>(leg. {metaDato})</span>
						</p>
					</div>
				);
			}
		}, {
			title: 'Concepto',
			field: 'conceptoDeAporte',
			render: rowData => {
				let concepto = rowData.conceptoDeAporte ? rowData.conceptoDeAporte : '-';
				if (concepto) {
					concepto = concepto.replace(/_/g, ' ');
				}
				return <div style={{ fontSize }}>{concepto}</div>;
			}
		}, {
			title: 'Médico',
			field: 'medico',
			sorting: false,
			render: rowData => {
				let { nombre, metaDato } = getNombreYMatriculaDeMedico(rowData);
				return (
					<div style={{ fontSize }}>
						<p>
							<span style={{ color: blue['500'] }}>{nombre} </span>
							<span>(matr. {metaDato})</span>
						</p>
					</div>
				);
			}
		},
		
		{
			title: 'Método',
			field: 'metodoMedicion',
			render: rowData => {
				let concepto = rowData.metodoMedicion ? rowData.metodoMedicion.nombre : '-';
				if (concepto) {
					concepto = concepto.replace(/_/g, ' ');
				}
				return <div style={{ fontSize }}>{concepto}</div>;
			}
		},
		
		
		{
			title: 'Aprobación',
			field: 'estado',
			render: rowData => {
				const estado = estadosDeNegociacion.find(e => e.value === rowData.estado);
				const color = getColorEstado(rowData.estado);
				return (
					<div style={{
						fontSizeTablaNegociados,
						color
					}}>
						{
							estado ? estado.label : ''
						}
					</div>
				);
			}
		}
	]
};

const fontSizeTablaNegociados = 12;
export const configuracionDeTablaNegociados = {
	titulo: 'Histórico de Negociados',
	columnas: [
		{
			title: 'Negociación',
			field: 'fechaNegociacion',
			render: rowData => {
				return (
					<div style={{ fontSizeTablaNegociados }}>
						{
							rowData.fechaNegociacion ?
								moment(rowData.fechaNegociacion).format('DD/MM/YYYY - hh:mm a') :
								'Sin negociar'
						}
					</div>
				);
			}
		}, {
			title: 'Monto',
			field: 'monto',
			render: rowData => {
				return (
					<div style={{ fontSizeTablaNegociados }}>
						{rowData.monto ? separadorDeMiles(rowData.monto) : '-'}
					</div>
				);
			}
		}, {
			title: 'Aprobación',
			field: 'estado',
			render: rowData => {
				const estado = estadosDeNegociacion.find(e => e.value === rowData.estado);
				return (
					<div style={{ fontSizeTablaNegociados }}>
						{estado ? estado.label : ''}
					</div>
				);
			}
		}
	]
};

export const obtenerConfguracionConceptoInfoSelectorConcepto = (formEditChangeInput, form) => {
	return [
		{
			name: 'conceptoDeAporte',
			label: 'Concepto de Aporte',
			props: {
				options: form.options.conceptosDeAporte,
				value: form.values.conceptoDeAporte,
				valueKey: 'value',
				labelKey: 'label',
				onChange: (value) => {
					formEditChangeInput('conceptoDeAporte', value);
				}
			},
			placeholder: 'Concepto de aporte...',
			component: RenderSingleSelect,
			col: 8
		}
	];
};

export const obtenerConfguracionConceptoInfoComentarios = (formEditChangeInput, form, disable) => {
	const comnetarioVisitador = form.values.comentarios.find(c => c.departamento === Departamento.VISITADOR);
	const contenidoComnetarioVisitador = comnetarioVisitador ? comnetarioVisitador.contenido : '';
	const comnetarioAnalista = form.values.comentarios.find(c => c.departamento === Departamento.ANALISTA);
	const contenidoComnetarioAnalista = comnetarioAnalista ? comnetarioAnalista.contenido : '';
	return [
		{
			name: 'comentariosVisitador',
			label: 'Comentarios de visitador',
			disabled: disable,
			props: {
				rows: 4,
				value: contenidoComnetarioVisitador,
				type: 'textarea',
				onChange: value => formEditChangeInput(Departamento.VISITADOR, value)
			},
			placeholder: 'Comentarios de visitador...',
			component: RenderField,
			col: 12
		}, {
			name: 'comentariosAnalista',
			label: 'Comentarios de analista',
			disabled: disable,
			props: {
				rows: 4,
				value: contenidoComnetarioAnalista,
				type: 'textarea',
				onChange: value => formEditChangeInput(Departamento.ANALISTA, value)
			},
			placeholder: 'Comentarios de analista...',
			component: RenderField,
			col: 12
		}
	];
};

export const obtenerConfguracionConceptoInfoFormTipoEconomico = (formEditChangeInput, form) => {


	return [
		{
			name: 'monto',
			label: 'Monto',
			type: 'number',
			props: {
				value: form.values.aporteEconomico.montoDeAporteEconomico,
				onChange: value => formEditChangeInput('montoDeAporteEconomico', value)
			},
			placeholder: 'Monto...',
			component: RenderField,
			col: 6
		}, {
			name: 'moneda',
			label: 'Moneda',
			props: {
				options: form.options.monedas,
				value: form.values.aporteEconomico.monedaDeAporteEconomico,
				valueKey: 'value',
				labelKey: 'label',
				onChange: value => formEditChangeInput('monedaDeAporteEconomico', value)
			},
			placeholder: 'Monedas...',
			component: RenderSingleSelect,
			col: 6
		}, {
			name: 'cantidadDePagos',
			label: 'Pagos',
			props: {
				options: form.options.cantidadDePagos,
				value: form.values.aporteEconomico.cantidadDePagos,
				valueKey: 'value',
				labelKey: 'label',
				onChange: value => {formEditChangeInput('cantidadDePagos', value); formEditChangeInput('medicionDesembolso', form.values.aporteEconomico.medicionDesembolso) }
			},
			placeholder: 'Cantidad de pagos...',
			component: RenderSingleSelect,
			col: 6
		}, {
			name: 'periodo',
			label: 'Periodo',
			props: {
				title: 'Periodo',
				options: form.options.periodos,
				value: form.values.aporteEconomico ? form.values.aporteEconomico.periodo : [],
				show: (form.values.metodoMedicion.metodo == "CATCHMENT" && form.values.metodoMedicion.tipoDeMetodo !== "SOLO MEDICION" && form.values.metodoMedicion.tipoDeMetodo !== undefined) ? true : false,
				onChange: value => formEditChangeInput('periodo', value)
			},
			component: RenderSingleOption,
			col: 12
		},
		{
			name: 'medicionDesembolso',
			label: 'Medición y Desembolso',
			props: {
				fechaNegociacion: form.values.fechaNegociacion,
				pagoTotal: form.values.aporteEconomico.montoDeAporteEconomico,
				cantidadPagos: form.values.aporteEconomico.cantidadDePagos,
				periodo: form.values.aporteEconomico.periodo,
				options: form.values.fechaPago ? form.values.fechaPago : [],
				value: form.values.fechaPago ? form.values.fechaPago : [],
				show: (form.values.metodoMedicion.metodo == "CATCHMENT" && form.values.metodoMedicion.tipoDeMetodo !== "SOLO MEDICION" && form.values.metodoMedicion.tipoDeMetodo !== undefined) ? true : false,
				ocultarMonto: form.values.metodoMedicion.tipoDeMetodo === "MEDICION Y DESEMBOLSO" ? false : true,
				onChange: value => formEditChangeInput('medicionDesembolso', value)
			},
			component: RenderMultipleDatePicker,
			col: 12
		}
	];
};

export const obtenerConfguracionMedico = (formEditChangeInput, changeDiaDeTrabajo, form) => {
	return [
		{
			name: 'diasDeAtencion',
			label: 'Días de Atención',
			props: {
				title: 'Días de Atención',
				value: form.values.diasDeAtencion,
				valueKey: 'value',
				labelKey: 'label',
				options: form.options.diasDeAtencion,
				onChange: changeDiaDeTrabajo,
				showBlockError: false
			},
			component: RenderMultipleOption,
			col: 12
		}, {
			name: 'cantidadDePacientes',
			label: 'Cantidad de Pacientes',
			type: 'number',
			props: {
				value: form.values.cantidadDePacientes,
				onChange: value => formEditChangeInput('cantidadDePacientes', value)
			},
			placeholder: 'Cantidad de pacientes...',
			component: RenderField,
			col: 6
		}
	];
};

export const obtenerConfguracionConceptoInfoFormTipoEvento = (formEditChangeInput, form) => {
	return [
		{
			name: 'evento',
			label: 'Evento',
			props: {
				value: form.values.pedidoDeBeca.evento,
				onChange: value => formEditChangeInput('evento', value)
			},
			placeholder: 'Evento...',
			component: RenderField,
			col: 6
		}, {
			name: 'lugar',
			label: 'Lugar',
			props: {
				value: form.values.pedidoDeBeca.lugar,
				onChange: value => formEditChangeInput('lugar', value)
			},
			placeholder: 'Lugar...',
			component: RenderField,
			col: 6
		}, {
			name: 'montoDeBeca',
			label: 'Costo',
			type: 'number',
			props: {
				value: form.values.pedidoDeBeca.montoDeBeca,
				onChange: value => formEditChangeInput('montoDeBeca', value)
			},
			placeholder: 'Costo...',
			component: RenderField,
			col: 6
		}, {
			name: 'moneda',
			label: 'Moneda',
			props: {
				options: form.options.monedas,
				value: form.values.pedidoDeBeca.monedaDeBeca ? form.values.pedidoDeBeca.monedaDeBeca : '',
				valueKey: 'value',
				labelKey: 'label',
				onChange: value => formEditChangeInput('monedaDeBeca', value)
			},
			placeholder: 'Monedas...',
			component: RenderSingleSelect,
			col: 6
		},
	];
};

const FechaLabel = (props) => {
	return (
		<List dense={true}>
			<ListItem
				dense={true}
				style={{ paddingLeft: 0 }}>
				<ListItemText
					primary='Fecha de Negociación'
					secondary={moment(props.values.fechaNegociacion).format('DD/MM/YYYY - hh:mm a')} />
			</ListItem>
		</List>
	);
};

export const opcionesDeNegociacion = (formEditChangeInput, form) => {
	return [
		{
			name: 'estadoNegociacion',
			label: 'Estados de negociación',
			props: {
				options: form.options.opcionesDeNegociacion,
				value: form.values.estado,
				show: true,
				onChange: value => formEditChangeInput('estado', value)
			},
			component: RenderSingleOption,
			col: 8
		}, {
			name: 'fecha',
			label: 'Fecha Negociación',
			props: {
				values: form.values
			},
			placeholder: 'Concepto de aporte...',
			component: FechaLabel,
			col: 4
		}
	];
};
export const opcionesDeNegociacionDetalle = (formEditChangeInput, form) => {
	return [
		{
			name: 'renovacion',
			label: 'Es Renovación?',
			props: {
				options: form.options.renovacion,
				value: form.values.esRenovacion !== null ? form.values.esRenovacion : '',
				valueKey: 'value',
				labelKey: 'label',
				onChange: value => formEditChangeInput('esRenovacion', value)
			},
			placeholder: 'Es Renovación?',
			component: RenderSingleSelect,
			col: 4
		}, {
			name: 'formaDePago',
			label: 'Forma de Pago',
			props: {
				options: form.options.formaDePago,
				value: form.values.formaDePago !== null ? form.values.formaDePago : '',
				valueKey: 'value',
				labelKey: 'label',
				onChange: value => formEditChangeInput('formaDePago', value)
			},
			placeholder: 'Forma de Pago',
			component: RenderSingleSelect,
			col: 4
		}, {
			name: 'cuenta',
			label: 'Cuenta',
			props: {
				value: form.values.cuenta,
				onChange: value => formEditChangeInput('cuenta', value)
			},
			placeholder: 'Cuenta...',
			component: RenderField,
			col: 4
		}, {
			name: 'excepcionDeAporte',
			label: 'Excepción de Aporte',
			props: {
				options: form.options.excepcionDeAporte,
				value: form.values.excepcionDeAporte !== null ? form.values.excepcionDeAporte : '',
				valueKey: 'value',
				labelKey: 'label',
				onChange: value => formEditChangeInput('excepcionDeAporte', value)
			},
			placeholder: 'Excepción de Aporte',
			component: RenderSingleSelect,
			col: 4
		}, {
			name: 'esCondicionado',
			label: 'Condicionado',
			props: {
				options: form.options.condicionado,
				value: form.values.esCondicionado !== null ? form.values.esCondicionado : '',
				valueKey: 'value',
				labelKey: 'label',
				onChange: value => formEditChangeInput('esCondicionado', value)
			},
			placeholder: 'Condicionado',
			component: RenderSingleSelect,
			col: 4
		}, {
			name: 'documentoDeIdentidad',
			label: 'CI / RUC',
			props: {
				value: form.values.documentoDeIdentidad,
				onChange: value => formEditChangeInput('documentoDeIdentidad', value)
			},
			placeholder: 'CI / RUC...',
			component: RenderField,
			col: 4
		}
	];
};

export const opcionesDeTermo = (formEditChangeInput, form) => {
	return [
		{
			name: 'termo',
			label: 'Opciones de termo',
			props: {
				title: 'Seleccionar Termo',
				options: form.options.termos,
				value: form.values.pedidoDeTermo.termo,
				show: true,
				onChange: value => formEditChangeInput('termo', value)
			},
			component: RenderSingleOption,
			col: 12
		}, {
			name: 'colorDeForrado',
			label: 'Color de forrado',
			props: {
				title: 'Seleccionar color de forrado',
				options: form.options.colorDeForrado,
				value: form.values.pedidoDeTermo.colorDeForrado,
				show: true,
				onChange: value => formEditChangeInput('colorDeForrado', value)
			},
			component: RenderSingleOption,
			col: 12
		}, {
			name: 'personalizacion',
			label: 'Personalización',
			placeholder: 'Personalización...',
			props: {
				value: form.values.pedidoDeTermo.personalizacion,
				onChange: value => formEditChangeInput('personalizacion', value)
			},
			component: RenderField,
			col: 12
		}
	];
};

export const opcionesDeMetodoMedicion = (formEditChangeInput, form) => {

	let fechas = [];
	if (form.values.fehcaPago) {
		form.values.fehcaPago.forEach(element => fechas.push(element.fecha));
	}
	return [
		{
			name: 'metodo',
			label: 'Opciones de Metodo de Medición',
			props: {
				title: 'Metodo de Medición',
				options: form.options.metodos,
				value: form.values.metodoMedicion.metodo ? form.values.metodoMedicion.metodo : [],
				show: true,
				onChange: value => { formEditChangeInput('metodo', value); formEditChangeInput('medicionDesembolso', form.values.metodoMedicion.medicionDesembolso) }
			},
			component: RenderSingleOption,
			col: 12
		}, {
			name: 'tipoDeMetodo',
			label: 'Tipo de Medición',
			props: {
				title: 'Tipo de Medición',
				options: form.options.tipoDeMetodo,
				value: form.values.metodoMedicion ? form.values.metodoMedicion.tipoDeMetodo : [],
				show: form.values.metodoMedicion.metodo == "CATCHMENT" ? true : false,
				onChange: value => formEditChangeInput('tipoDeMetodo', value)
			},
			component: RenderSingleOption,
			col: 12
		}/*,
		{
			name: 'periodo',
			label: 'Periodo',
			props: {
				title: 'Periodo',
				options: form.options.periodos,
				value: form.values.metodoMedicion ? form.values.metodoMedicion.periodo : [],
				show: (form.values.metodoMedicion.metodo == "CATCHMENT" && form.values.metodoMedicion.tipoDeMetodo !== "SOLO_MEDICION" && form.values.metodoMedicion.tipoDeMetodo !== undefined) ? true : false,
				onChange: value => formEditChangeInput('periodo', value)
			},
			component: RenderSingleOption,
			col: 12
		},
		{
			name: 'medicionDesembolso',
			label: 'Medición y Desembolso',
			props: {
				options: form.values.fechaPago ? form.values.fechaPago : [],
				fechas: fechas,
				show: (form.values.metodoMedicion.metodo == "CATCHMENT" && form.values.metodoMedicion.tipoDeMetodo !== "SOLO_MEDICION" && form.values.metodoMedicion.tipoDeMetodo !== undefined) ? true : false,
				onChange: value => formEditChangeInput('medicionDesembolso', value)
			},
			component: RenderMultipleDatePicker,
			col: 12
		}*/
	];
};
