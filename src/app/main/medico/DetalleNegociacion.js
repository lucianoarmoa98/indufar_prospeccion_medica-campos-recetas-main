import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Slide from '@material-ui/core/Slide';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import {Grid, makeStyles} from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import {green, red, yellow} from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import moment from 'moment';
import {Departamento} from '../UIUtils';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})((props) => <Radio color="default"  {...props} />);

const RedRadio = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600]
    }
  },
  checked: {}
})((props) => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
  root: {
    color: yellow[400],
    '&$checked': {
      color: yellow[600]
    }
  },
  checked: {}
})((props) => <Radio color="default" {...props} />);

const DetalleNegociacion = props => {
  const classes = useStyles();
  if (!props.negociacion) {
    return <div/>;
  }
  const {
    negociacion: {
      itemsNegociacion,
      medico,
      comentarios,
      monto,
      fechaNegociacion
    }
  } = props;
  const comnetarioVisitador = comentarios.find(c => c.departamento === Departamento.VISITADOR);
  return (
    <Dialog
      fullScreen
      scroll='paper'
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
            <CloseIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Negociación
          </Typography>
          <Button variant="contained" color="secondary" onClick={props.handleClose}>
            Guardar
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div style={{marginTop: 16}}>
              <FormControlLabel
                disabled={true}
                value="aceptar"
                control={
                  <GreenRadio
                    checked={false}
                    onChange={() => {
                    }}
                    value="aceptar"
                    name="aceptar"
                    inputProps={{ 'aria-label': 'C' }}
                    label="Aceptar"/>
                }
                label="Aceptar"/>
              <FormControlLabel
                value="rechazar"
                control={
                  <RedRadio
                    checked={false}
                    onChange={() => {
                    }}
                    value="rechazar"
                    name="rechazar"
                    inputProps={{ 'aria-label': 'B' }}
                    label="Rechazar"/>
                }
                label="Rechazar"/>
              <FormControlLabel
                value="condicionado"
                control={
                  <YellowRadio
                    checked={false}
                    onChange={() => {}}
                    value="condicionado"
                    name="condicionado"
                    inputProps={{ 'aria-label': 'B' }}
                    label="Condicionado"/>
                }
                label="Condicionado"/>
            </div>
            <List>
              <ListItem
                style={{ paddingLeft: 0 }}>
                <ListItemText
                  primary={'Fecha de Negociación'}
                  secondary={moment(fechaNegociacion).format('DD/MM/YYYY - hh:mm a')}/>
              </ListItem>
            </List>
            <TextField
              label="Monto"
              type='number'
              value={monto}
              variant="outlined"
              style={{ marginTop: 16 }}/>
            <TextField
              label="Comentarios de visitador"
              multiline
              rows={4}
              value={comnetarioVisitador ? comnetarioVisitador.contenido : ""}
              variant="outlined"
              fullWidth
              style={{ marginTop: 16 }}/>
            <List
              subheader={
                <ListSubheader
                  disableSticky={true}
                  style={{ paddingLeft: 0, lineHeight: '24px' }}>
                  Médico
                </ListSubheader>
              }
              style={{ marginTop: 24 }}>
              <ListItem
                key={0}
                style={{ paddingLeft: 0 }}>
                <ListItemText
                  primary={medico.nombre}
                  secondary={`Matr. ${medico.matricula}`}/>
              </ListItem>
              <ListItem
                key={1}
                style={{ paddingLeft: 0 }}>
                <ListItemText
                  primary={medico.especialidad}
                  secondary={medico.consultorio}/>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <List
              subheader={
                <ListSubheader
                  disableSticky={true}
                  style={{ paddingLeft: 0, lineHeight: '24px' }}>
                  Productos
                </ListSubheader>
              }>
              {
                itemsNegociacion.map((item, index) =>
                  <ListItem
                    key={index}
                    style={{ paddingLeft: 0 }}>
                    <ListItemText
                      primary={item.producto.descripcion}
                      secondary={item.esExlusivo ? 'Exclusivo' : 'Compartido'}/>
                  </ListItem>
                )
              }
            </List>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DetalleNegociacion;
