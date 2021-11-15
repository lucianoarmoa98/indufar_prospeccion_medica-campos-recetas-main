import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {green, grey, pink} from '@material-ui/core/colors';
import Productos from '../negociacion/Productos';
import Footer from '../../../components/Form/Footer';
import {
  END_POINT_PRODUCTOS_DE_PROSPECTO,
  sleep
} from '../UIUtils';
import * as axios from 'axios';
import {withRouter} from 'react-router-dom';

class ScrollDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formEdit: {values: {itemsNegociacion: []}},
      submitting: false,
      error: '',
      success: false
    };
    this.agregarProducto = this.agregarProducto.bind(this);
    this.removerProducto = this.removerProducto.bind(this);
    this.actualizarProspeccion = this.actualizarProspeccion.bind(this);
  }

  agregarProducto(producto) {
    this.setState(prevState => {
        let items = prevState.formEdit.values.itemsNegociacion;
        items = [
          ...items,
          {
            producto
          }
        ];
        return {
          ...prevState,
          formEdit: {values: {itemsNegociacion: items}}
        };
      }
    );
  }

  removerProducto(item) {
    const productoARemover = item.producto;
    this.setState(prevState => {
        let items = prevState.formEdit.values.itemsNegociacion;
        const index = items.findIndex(it => it.producto.codigo === productoARemover.codigo);
        const itemsIzq = items.slice(0, index);
        const itemsDer = items.slice(index + 1, items.length);
        return {
          ...prevState,
          formEdit: {
            values: {
              itemsNegociacion:
                [
                  ...itemsIzq,
                  ...itemsDer
                ]
            }
          }
        };
      }
    );
  }

  actualizarProspeccion() {
    const matricula = this.props.match.params.matricula;
    const endPoint = `${END_POINT_PRODUCTOS_DE_PROSPECTO}/medicos/${matricula}`;
    const productos = this.state.formEdit.values.itemsNegociacion.map(e => e.producto);
    this.setState({
      submitting: true
    }, () => {
      axios.put(endPoint, [...productos])
        .then(() => {
          this.setState({
            submitting: false,
            success: true
          });
          sleep(400).then(() => {
            this.props.handleClose();
            sleep(200).then(() => {
              this.props.recargarTabla();
            });
            this.setState({
              formEdit: {
                values: {
                  itemsNegociacion: []
                }
              },
              success: false,
              error: ''
            })
          })
        })
        .catch(error => {
          this.setState({
            error,
            submitting: false
          });
        });
    });

  }

  render() {
    const {
      open,
      handleClose
    } = this.props;
    const {
      formEdit,
      submitting,
      error,
      success
    } = this.state;
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll='paper'
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          fullWidth={true}
          maxWidth='sm'>
          <DialogTitle id="scroll-dialog-title">
            Agregar 1 o más productos
          </DialogTitle>
          <DialogContent dividers={true}>
            <Productos
              addProducto={this.agregarProducto}
              removeProducto={this.removerProducto}
              changeExclusivoProducto={() => {
              }}
              formEdit={formEdit}
              mostrarTipoDeNegociacion={false}/>
          </DialogContent>
          <DialogActions>
            <Footer
              submitting={submitting}
              error={error}
              success={success}/>
            <Button onClick={handleClose} style={{color: pink['500']}}>
              Cancelar
            </Button>
            <Button
              onClick={this.actualizarProspeccion}
              style={{color: formEdit.values.itemsNegociacion.length === 0 || submitting ? grey['500'] : green['500']}}
              disabled={formEdit.values.itemsNegociacion.length === 0 || submitting}>
              Agregar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(ScrollDialog);
