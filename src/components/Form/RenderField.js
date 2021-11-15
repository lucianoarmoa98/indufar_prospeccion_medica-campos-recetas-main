import React from 'react';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';

class RenderField extends React.Component {

  constructor(props) {
    super(props);
    // Se utiliza state del component para almacenar los valores del input
    // para mejorar el performance y feedback al usuario.
    this.state = {
      value: props.value || ''
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Condición para evitar sobreescritura inncesaria en el input, para
    // performance.
    if (prevProps.value !== this.props.value && this.props.value !== this.state.value) {
      this.setState({
        value: this.props.value || ''
      });
      this.props.input.onChange(this.props.value || '');
      this.props.clearAsyncError(this.props.input.name);
    }
  }

  render() {
    const {
      input,
      label,
      type,
      disabled,
      onChange,
      meta: {touched, error},
      clearAsyncError,
      placeholder,
      autoFocus,
      required,
      rows
    } = this.props;
    const {
      value
    } = this.state;
    const inputStyle = {};
    if (type === 'textarea') {
      inputStyle.rows = rows ? rows : 7;
      inputStyle.multiline = true;
    }
    return (
      <div style={{
        marginTop: 6
      }}>
        <div>
          <TextField
            {...input}
            {...inputStyle}
            className="mt-8"
            variant="filled"
            required={required}
            autoFocus={autoFocus}
            value={value}
            type={type}
            label={label}
            placeholder={placeholder}
            onChange={(e) => {
              input.onChange(e);
              this.setState({
                value: e.target.value
              });
              if (onChange) {
                onChange(e.target.value);
              }
              clearAsyncError(input.name);
            }}
            disabled={disabled}
            fullWidth/>
          {
            touched && error ?
              <Alert severity="error" style={{padding: '0px 8px'}}>
                {error}
              </Alert> :
              <div style={{height: 23, marginTop: 2, width: '100%'}}/>
          }
        </div>
      </div>
    );
  }
}

export default RenderField;
