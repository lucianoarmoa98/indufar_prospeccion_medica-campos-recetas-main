import React from 'react';
import Alert from '@material-ui/lab/Alert';
import {withStyles} from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Typography} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import _ from 'lodash';

const styles = theme => ({
  formControl: {
    marginTop: theme.spacing(1),
    width: '100%'
  }
});

class RenderMultipleOption extends React.Component {

  constructor(props) {
    super(props);
    const options = props.options ? props.options : [];
    const value = props.value ? props.value : [];
    this.state = {
      options,
      value
    };
  }

  render() {
    const {
      onChange,
      title,
      showBlockError: mostrarBloqueDeError,
      valueKey,
      labelKey,
      meta: {touched, error}
    } = this.props;
    const showBlockError = typeof mostrarBloqueDeError === 'undefined' || mostrarBloqueDeError;
    const {
      options,
      value
    } = this.state;
    return (
      <div style={{
        marginTop: 6
      }}>
        <FormControl component="fieldset" style={{margin: 0}}>
          {
            title &&
            <Typography className="text-16 sm:text-16 truncate">
              {title}
            </Typography>
          }
          <FormGroup aria-label="position" row>
            {
              options.map((e, index) => {
                const valueOfOption = e[valueKey];
                const isChecked = typeof _.find(value, (v) => v === valueOfOption) !== 'undefined';
                return (
                  <FormControlLabel
                    key={index}
                    value={e[valueKey]}
                    control={
                      <Checkbox
                        checked={isChecked}
                        onChange={(event) => {
                          const {checked} = event.target;
                          const index = value.findIndex(v => v === valueOfOption);
                          if (index !== -1 && checked) {
                            const leftSide = value.slice(0, index);
                            const rightSide = value.slice(index + 1, value.length);
                            this.setState({
                              value: [
                                ...leftSide,
                                valueOfOption,
                                ...rightSide
                              ]
                            });
                            onChange([...leftSide, valueOfOption, ...rightSide]);
                          } else if (index === -1 && checked) {
                            this.setState(prevState => {
                              onChange([...prevState.value, valueOfOption]);
                              return {
                                value: [...prevState.value, valueOfOption]
                              };
                            });
                          } else if (index !== -1 && !checked) {
                            const leftSide = value.slice(0, index);
                            const rightSide = value.slice(index + 1, value.length);
                            this.setState({
                              value: [
                                ...leftSide,
                                ...rightSide
                              ]
                            });
                            onChange([...leftSide, ...rightSide]);
                          }
                        }}
                        color="secondary"/>
                    }
                    label={e[labelKey]}
                    labelPlacement="bottom"
                    style={{margin: 8}}/>
                );
              })}
          </FormGroup>
        </FormControl>
        {
          showBlockError && <>
            {
              touched && error ?
                <Alert severity="error" style={{padding: '0px 8px'}}>
                  {error}
                </Alert> :
                <div style={{height: 23, marginTop: 2, width: '100%'}}/>
            }
          </>
        }
      </div>
    );
  }
}

export default withStyles(styles)(RenderMultipleOption);
