import Objetivo from './Objetivo';
import RenderField from '../../../components/Form/RenderField';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const ObjetivoConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/objetivos-apm/medico-region/:idDeObjetivo',
      component: Objetivo
    }
  ]
};

export const obtenerConfiguracionDeFormObjetivo = (formCreateChangeInput, form) => {
  return [
    {
      name: 'matricula',
      label: 'Matrícula *',
      props: {
        value: form.values.matricula,
        onChange: (value) => {
          formCreateChangeInput('matricula', value);
        },
        autoFocus: true
      },
      placeholder: 'Matrícula del Médico...',
      component: RenderField
    }, {
      name: 'nombre',
      label: 'Médico *',
      props: {
        value: form.values.nombre,
        onChange: (value) => {
          formCreateChangeInput('nombre', value);
        }
      },
      placeholder: 'Médico...',
      component: RenderField
    }, {
      name: 'codigoMedicoRegion',
      label: 'Código Médico Región *',
      props: {
        value: form.values.codigoMedicoRegion,
        onChange: (value) => {
          formCreateChangeInput('codigoMedicoRegion', value);
        }
      },
      placeholder: 'Código Médico Región...',
      component: RenderField
    }, {
      name: 'objetivo',
      label: 'Objetivo *',
      props: {
        value: form.values.objetivo,
        onChange: (value) => {
          formCreateChangeInput('objetivo', value);
        }
      },
      placeholder: 'Objetivo...',
      component: RenderField
    } , {
      name: 'anho',
      label: 'Año *',
      props: {
        value: form.values.anho,
        onChange: (value) => {
          formCreateChangeInput('anho', value);
        }
      },
      placeholder: 'Año...',
      component: RenderField
    }
  ];
};


export default ObjetivoConfig;
