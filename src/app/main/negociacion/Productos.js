import {Paper, Typography} from '@material-ui/core';
import List from '@material-ui/core/List';
import * as PropTypes from 'prop-types';
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import _ from '@lodash';
import {END_POINT_PRODUCTOS} from '../productos/ProductosConfig';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GreenRadio from './GreenRadio';
import YellowRadio from './YellowRadio';
import {red} from '@material-ui/core/colors';
import UsuarioContext from '../../UsuarioContext';

class Productos extends React.Component {

  static contextType = UsuarioContext;
  _isMounted = false;
  mostrarButton = true;

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      open: false,
      options: [],
      loading: false,
      inputValue: ''
    };
    this.setOpen = this.setOpen.bind(this);
    this.setOptions = this.setOptions.bind(this);
    this.obtenerProductos = _.debounce(this.obtenerProductos, 700);
    this.setLoading = this.setLoading.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const {usuario}  = this.context;
    const {roles, legajo} = usuario || {};
    if (roles && (roles.includes("JEFE") || roles.includes("SUPERVISOR") || roles.includes("GERENTE") || roles.includes("DIRECTIVO"))) {
      this.mostrarButton = false;
    }
  }

  setLoading(value) {
    this.setState({
      loading: value
    });
  }

  obtenerProductos(value, setOpen, setLoading, onComplete) {
    if (!value) {
      return;
    }
    setLoading(true);
    setOpen(false);
    fetch(`${END_POINT_PRODUCTOS}?busqueda=${value}&porPagina=100`)
      .then(response => response.json())
      .then(productos => {
        setOpen(true);
        setLoading(false);
        onComplete(productos.data);
      })
      .catch(e => console.error(e));
  }

  setOpen(value) {
    this.setState({
      open: value
    });
  }

  setOptions(options) {
    this.setState({
      options
    });
  }

  render() {
    const {loading, options, open, inputValue} = this.state;
    const {items, addProducto, removeProducto, changeExclusivoProducto, mostrarTipoDeNegociacion, titulo} = this.props;
    const {setOpen, obtenerProductos, setOptions, setLoading} = this;
    return (
      <Paper className="w-full rounded-8 shadow-none border-1">
        <div className="flex items-center justify-between px-4 pt-4"
             style={{minHeight: 52}}>
          <Typography className="text-16 px-12">{titulo}</Typography>
        </div>
        <Autocomplete
          disabled = {!this.mostrarButton}
          fullWidth={true}
          open={open}
          autoHighlight={true}
          getOptionSelected={(option, value) => option.codigo === value.codigo}
          getOptionLabel={(option) => option.descripcion}
          options={options}
          loading={loading}
          loadingText='Cargando productos...'
          noOptionsText='No hay productos...'
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth={true}
              placeholder="Buscar producto para agregar..."
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {
                      loading ?
                        <CircularProgress color="inherit" size={20}/> :
                        null
                    }
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                )
              }}
              onChange={event => {
                const {value} = event.target;
                this.setState({inputValue: value});
                obtenerProductos(value, setOpen, setLoading, setOptions);
              }}/>
          )}
          onChange={(event, value, reason) => {
            setOptions([]);
            setOpen(false);
            this.setState({inputValue: ''});
            addProducto(value);
          }}
          inputValue={inputValue}
          style={{marginLeft: 16, marginRight: 16}}/>
        <div style={{marginLeft: 16, marginRight: 16}}>
          <List>
            {
              items.map((item, index) =>
                <ListItem
                  key={index}
                  style={{paddingLeft: 0}}>
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div>{item.producto.descripcion}</div>
                    {
                      mostrarTipoDeNegociacion &&
                      <div>
                        <FormControlLabel

                          value="exclusivo"
                          control={
                            <GreenRadio
                              disabled={!this.mostrarButton}
                              checked={item.esExclusivo}
                              onChange={() => changeExclusivoProducto(true, item)}
                              value="exclusivo"
                              name="exclusivo"
                              label="Exclusivo"/>
                          }
                          label="Exclusivo"/>
                        <FormControlLabel
                          value="compartido"
                          control={
                            <YellowRadio
                              disabled={!this.mostrarButton}
                              checked={!item.esExclusivo}
                              onChange={() => changeExclusivoProducto(false, item)}
                              value="compartido"
                              name="compartido"
                              label="Compartido"/>
                          }
                          label="Compartido"/>
                      </div>
                    }
                  </div>
                { (this.mostrarButton) &&
                  <ListItemSecondaryAction>
                    <Tooltip title="Eliminar">
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => removeProducto(item)}
                        style={{color: red['500']}}>
                        <DeleteIcon/>
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                }
                </ListItem>
              )
            }
          </List>
        </div>
      </Paper>
    );
  }
}

Productos.propTypes = {
  addProducto: PropTypes.any,
  removeProducto: PropTypes.any,
  changeExclusivoProducto: PropTypes.any,
  formEdit: PropTypes.any,
  mostrarTipoDeNegociacion: PropTypes.any,
  titulo: PropTypes.any,
  items: PropTypes.any
};

export default Productos;
