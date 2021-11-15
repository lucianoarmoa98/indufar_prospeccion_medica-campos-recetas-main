import React from 'react';
import Alert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import _ from '@lodash';

const styles = theme => ({
  formControl: {
    marginTop: theme.spacing(1),
    width: '100%'
  }
});

const getLabelColor = (options, valueKey, value) => {
  if (!options || _.isEmpty(options)) {
    return '';
  }
  const option = options.find(e => {
    return e[valueKey] === value;
  });
  if (option) {
    return option.color;
  }
  return '';
};

class RenderSingleSelect extends React.Component {

  constructor(props) {
    super(props);
    const options = props.options ? props.options : [];
    this.state = {
      options,
      value: props.value,
      color: getLabelColor(props.options,  props.valueKey, props.value)
    };
    this.valueWasUpdated = this.valueWasUpdated.bind(this);
    this.optionsWereUpdated = this.optionsWereUpdated.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Condición para evitar sobreescritura inncesaria en el input, para
    // performance.
    if (this.valueWasUpdated(prevProps) || this.optionsWereUpdated(prevProps)) {
      const options = this.props.options ? this.props.options : [];
      this.setState({
        options,
        value: this.props.value,
        color: getLabelColor(options,  this.props.valueKey,  this.props.value)
      });
      if (this.props.clearAsyncError) {
        this.props.clearAsyncError(this.props.input.name);
      }
    }
  }

  valueWasUpdated(prevProps) {
    return JSON.stringify(prevProps.value) !== JSON.stringify(this.props.value)
      && JSON.stringify(this.props.value) !== JSON.stringify(this.state.value);
  }

  optionsWereUpdated(prevProps) {
    return this.props.options
      && JSON.stringify(prevProps.options) !== JSON.stringify(this.props.options);
  }

  render() {
    const {
      onChange,
      valueKey,
      labelKey,
      name,
      label,
      meta: { touched, error }
    } = this.props;
    const {
      options,
      value,
      color
    } = this.state;
    const { classes } = this.props;
    const selectStyle = {};
    if (color) {
      selectStyle.color = color;
    }
    return (
      <div style={{
        marginTop: 6
      }}>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id={`select-label-${name}`}>{label}</InputLabel>
          <Select
            id={`select-input-${name}`}
            labelId={`select-label-${name}`}
            value={value}
            onChange={e => {
              const value = e.target.value;
              const color = getLabelColor(options, valueKey, value);
              this.setState({
                value,
                color
              });
              onChange(value);
            }}
            style={{
              width: '100%',
              ...selectStyle
            }}>
            {
              options.map((e, index) => {
                const style = {};
                if (e.color) {
                  style.color = e.color;
                }
                return (
                  <MenuItem
                    key={index}
                    value={e[valueKey]}
                    style={style}>
                    {e[labelKey]}
                  </MenuItem>
                );
              })
            }
          </Select>
        </FormControl>
        {
          touched && error ?
            <Alert severity="error" style={{ padding: '0px 8px' }}>
              {error}
            </Alert> :
            <div style={{ height: 23, marginTop: 2, width: '100%' }}/>
        }
      </div>
    );
  }
}

export default withStyles(styles)(RenderSingleSelect);
