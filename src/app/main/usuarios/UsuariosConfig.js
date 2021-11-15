import Creacion from '../usuario/Creacion';
import Edicion from '../usuario/Edicion';
import Usuarios from './Usuarios';
import React from 'react';
import RenderField from '../../../components/Form/RenderField';
import RenderSingleSelect from '../../../components/Form/RenderSingleSelect';
import RenderMultipleSelect
  from '../../../components/Form/RenderMultipleSelect';
import {getRolColor, getRolLabel} from './store/reducers/usuarios.reducer';

export const UsuariosConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/usuarios',
      component: Usuarios,
      exact: true
    }, {
      path: '/crear-usuario',
      component: Creacion,
      exact: true
    }, {
      path: '/usuarios/:id',
      component: Edicion,
      exact: true
    }
  ]
};

export const END_POINT_USUARIOS = 'https://us-central1-indufar-prospeccion-medi-af3dc.cloudfunctions.net/prospeccion/usuarios';
const fontSize = 12;
export const configuracionDeTabla = {
  titulo: 'Usuarios',
  columnas: [
    {
      title: 'Apellido',
      field: 'apellido',
      render: rowData => {
        return (
          <div
            style={{fontSize}}>
            {rowData.apellido || '-'}
          </div>
        );
      }
    }, {
      title: 'Nombre',
      field: 'nombre',
      render: rowData => {
        return (
          <div
            style={{fontSize}}>
            {rowData.nombre || '-'}
          </div>
        );
      }
    }, {
      title: 'Email',
      field: 'email',
      render: rowData => {
        return (
          <div
            style={{fontSize}}>
            {rowData.email}
          </div>
        );
      }
    }, {
      title: 'Legajo',
      field: 'legajo',
      render: rowData => {
        return (
          <div
            style={{fontSize}}>
            {rowData.legajo || '-'}
          </div>
        );
      }
    }, {
      title: 'Roles',
      field: 'roles',
      render: rowData => {
        let roles = null;
        if (rowData.roles) {
          roles = rowData.roles.map((r, index) => {
            return (
              <div
                key={index}
                className='custom-form'
                style={{
                  fontSize,
                  background: getRolColor(r)
                }}>
                {getRolLabel(r)}
              </div>
            );
          });
        }
        return (
          <div
            style={{fontSize}}>
            {roles}
          </div>
        );
      }
    }, {
      title: 'Estado',
      field: 'estado',
      render: rowData => {
        return (
          <div
            className='custom-form'
            style={{
              fontSize,
              backgroundColor: rowData.disabled ? 'red' : 'green'
            }}>
            {rowData.disabled ? 'Inactivo' : 'Activo'}
          </div>
        );
      }
    }
  ]
};

export const obtenerConfguracionUsuario0 = (formCreateChangeInput, form) => {
  return [
    {
      name: 'nombre',
      label: 'Nombre *',
      props: {
        value: form.values.nombre,
        onChange: (value) => {
          formCreateChangeInput('nombre', value);
        },
        autoFocus: true
      },
      placeholder: 'Nombre del usuario...',
      component: RenderField
    }, {
      name: 'apellido',
      label: 'Apellido *',
      props: {
        value: form.values.apellido,
        onChange: (value) => {
          formCreateChangeInput('apellido', value);
        }
      },
      placeholder: 'Apellido del usuario...',
      component: RenderField
    }, {
      name: 'email',
      label: 'Email *',
      props: {
        value: form.values.email,
        onChange: (value) => {
          formCreateChangeInput('email', value);
        }
      },
      placeholder: 'Email del usuario...',
      component: RenderField
    }, {
      name: 'legajo',
      label: 'Legajo *',
      props: {
        value: form.values.legajo,
        onChange: value => {
          formCreateChangeInput('legajo', value);
        }
      },
      placeholder: 'Legajo del usuario...',
      component: RenderField
    }, {
      name: 'roles',
      label: 'Roles',
      props: {
        options: form.options.roles,
        value: form.values.roles,
        valueKey: 'value',
        labelKey: 'label',
        onChange: (values) => {
          formCreateChangeInput('roles', values);
        }
      },
      placeholder: 'Roles...',
      component: RenderMultipleSelect
    }, {
      name: 'activo',
      label: 'Estado',
      props: {
        options: form.options.estados,
        value: form.values.activo,
        valueKey: 'value',
        labelKey: 'label',
        onChange: (value) => {
          formCreateChangeInput('activo', value);
        }
      },
      placeholder: 'Estado...',
      component: RenderSingleSelect
    }
  ];
};

export const obtenerConfguracionUsuario1 = (formCreateChangeInput) => {
  return [
    {
      name: 'contrasenha0',
      label: 'Contraseña *',
      type: 'password',
      props: {
        value: '',
        onChange: (value) => {
          formCreateChangeInput('contrasenha0', value);
        }
      },
      placeholder: 'Contraseña...',
      component: RenderField
    }, {
      name: 'contrasenha1',
      label: 'Repetir Contraseña *',
      type: 'password',
      props: {
        value: '',
        onChange: (value) => {
          formCreateChangeInput('contrasenha1', value);
        }
      },
      placeholder: 'Repetir Contraseña...',
      component: RenderField
    }
  ];
};
