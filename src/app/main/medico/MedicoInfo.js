import React from 'react';
import {Button, Paper, Typography} from '@material-ui/core';
import {blue} from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class MedicoInfo extends React.Component {

  render() {
    const {medico} = this.props;
    return (
      <Paper className="w-full rounded-8 shadow-none border-1">
        <div className="flex items-center justify-between px-4 pt-4" style={{minHeight: 52}}>
          <Typography className="text-16 px-12">Médico</Typography>
        </div>
        <div
          style={{marginTop: 0, marginLeft: 16, marginRight: 16}}>
          <List dense={true}>
            <ListItem
              key={0}
              dense={true}
              style={{paddingLeft: 0}}>
              <ListItemText
                primary={`${medico.nombre} (Matrícula ${medico.matricula})`}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                      style={{display: 'inline', color: blue['500']}}>
                      Categoría {medico.categoria ? `(${medico.categoria})` : '(sin dato)'}
                    </Typography>
                    <br/>
                    Especialidad - {`${medico.especialidad1}`} {medico.especialidad2 ? ` y ${medico.especialidad2}` : ''}
                    <br/>
                    {medico.consultorio} - Área {medico.area ? medico.area : '(sin área)'}
                  </>
                }/>
            </ListItem>
          </List>
        </div>
      </Paper>
    );
  }
}

export default MedicoInfo;
