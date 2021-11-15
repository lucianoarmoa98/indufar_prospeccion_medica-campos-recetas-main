import React from 'react';
import Alert from '@material-ui/lab/Alert';
import {withStyles} from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import {Typography} from '@material-ui/core';

const styles = theme => ({
  formControl: {
    marginTop: theme.spacing(1),
    width: '100%'
  }
});

class RenderSingleOption extends React.Component {

  constructor(props) {
    super(props);
    const options = props.options ? props.options : [];
    this.state = {
      options,
      value: props.value
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
        value: this.props.value
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
      title,
      meta: {touched, error}
    } = this.props;
    const {
      options,
      value
    } = this.state;
    return (
      <>  {this.props.show &&
      <div style={{
        marginTop: 6
      }}>
        <div style={{marginTop: 16}}>
          {
            title &&
            <Typography className="text-16 sm:text-16 truncate">{title}</Typography>
          }
          <>
            {
              options.map((option, index) => {
                const style = {};
                if (option.color) {
                  style.color = option.color;
                }
                return (
                  <FormControlLabel
                    key={index}
                    control={
                      <Radio
                        checked={option.value === value}
                        onChange={(e) => {
                          this.setState({
                            value: e.target.value
                          });
                          onChange(e.target.value)
                        }}
                        value={option.value}
                        name={option.name}
                        label={option.label}
                        style={style}/>
                    }
                    label={option.label}/>
                );
              })
            }
          </>
        </div>
        {
          touched && error ?
            <Alert severity="error" style={{padding: '0px 8px'}}>
              {error}
            </Alert> :
            <div style={{height: 23, marginTop: 2, width: '100%'}}/>
        }
      </div>
  }
      </>
    );
  }
}

export default withStyles(styles)(RenderSingleOption);
