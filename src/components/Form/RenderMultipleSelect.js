/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/styles';

const useStyles = () => ({
  root: {}
});

class RenderMultiSelect extends React.Component {

  constructor(props) {
    super(props);
    const options = props.options ? props.options : [];
    let valueOfSelect = [];
    if (props.value) {
      options.forEach(e => {
        const val = e[props.valueKey];
        if (props.value.includes(val)) {
          valueOfSelect = [
            e,
            ...valueOfSelect
          ];
        }
      });
    }
    // Se utiliza state del component para almacenar los valores del input
    // para mejorar el performance y feedback al usuario.
    this.state = {
      options,
      valueOfSelect,
      value: props.value
    };
    this.valueWasUpdated = this.valueWasUpdated.bind(this);
    this.optionsWereUpdated = this.optionsWereUpdated.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Condición para evitar sobreescritura inncesaria en el input, para
    // performance.
    if (this.valueWasUpdated(prevProps) || this.optionsWereUpdated(prevProps)) {
      const { options, value, valueKey } = this.props;
      const _options = options ? options : [];
      let valueOfSelect = [];
      if (value) {
        _options.forEach(e => {
          const val = e[valueKey];
          if (value.includes(val)) {
            valueOfSelect = [
              e,
              ...valueOfSelect
            ];
          }
        });
      }
      this.setState({
        options: _options,
        valueOfSelect,
        value
      });
      if (this.props.clearAsyncError) {
        this.props.clearAsyncError(this.props.input.name);
      }
    }
  }

  valueWasUpdated(prevProps) {
    return this.props.value
      && JSON.stringify(prevProps.value) !== JSON.stringify(this.props.value)
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
      label,
      meta: { touched, error }
    } = this.props;
    const {
      options,
      valueOfSelect
    } = this.state;
    return (
      <div style={{
        marginTop: 13
      }}>
        <Autocomplete
          freeSolo
          multiple
          options={options}
          getOptionLabel={e => e[labelKey]}
          getOptionSelected={option => {
            if (!valueOfSelect) {
              return false;
            }
            return valueOfSelect.find(v => v[valueKey] === option[valueKey]);
          }}
          value={valueOfSelect}
          renderTags={(valueOfSelect, getTagProps) =>
            valueOfSelect.map((option, index) => {
              const style = {};
              if (option.color) {
                style.color = option.color;
              }
              return (
                <Chip
                  variant="outlined"
                  label={option[labelKey]}
                  {...getTagProps({ index })}
                  style={style}/>
              );
            })
          }
          renderInput={params => (
            <TextField
              {...params}
              variant="filled"
              label={label}
              placeholder="Selecciona..."
              fullWidth/>
          )}
          onChange={(event, value) => {
            const _value = value.map(v => v[valueKey]);
            onChange([
              ..._value
            ]);
          }}/>
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

export default withStyles(useStyles)(RenderMultiSelect);
