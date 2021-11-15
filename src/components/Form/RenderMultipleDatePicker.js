import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    formControl: {
        marginTop: theme.spacing(1),
        width: '100%'
    }
});

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

class RenderMultipleDatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.valueWasUpdated = this.valueWasUpdated.bind(this);
        this.optionsWereUpdated = this.optionsWereUpdated.bind(this);
        this.onChangeFecha = this.onChangeFecha.bind(this);
        this.generarFechas = this.generarFechas.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeMonto = this.changeMonto.bind(this);


        const {
            pagoTotal,
            cantidadPagos,
            fechaNegociacion,
            periodo,
            ocultarMonto
        } = props;

        const options = (props.options && props.options.length > 0) ? props.options : this.generarFechas(pagoTotal, cantidadPagos, periodo, fechaNegociacion, ocultarMonto);

        let fechas = [];
        options.forEach(element => fechas.push(element.fecha));
        this.state = {
            options,
            fechas,
            value: props.value,
            show: props.show
        };

        this.props.onChange(options, "medicionDesembolso");
    }

    componentDidMount() {
    }

    shouldComponentUpdate(nextProps, nextState) {
        let options = [];

        if ((nextProps.periodo !== this.props.periodo) || (nextProps.cantidadPagos !== this.props.cantidadPagos) 
        || (nextProps.pagoTotal !== this.props.pagoTotal) || (nextProps.ocultarMonto !== this.props.ocultarMonto)) {
            const {
                pagoTotal,
                cantidadPagos,
                fechaNegociacion,
                periodo
            } = nextProps;
            options = this.generarFechas(pagoTotal, cantidadPagos, periodo, fechaNegociacion, nextProps.ocultarMonto);
            this.setState({
                options
            });
            this.props.onChange(options, "medicionDesembolso");

        }

        return true;

    }

    componentDidUpdate(prevProps) {

    }

    generarFechas(montoTotal, cantidadDePagos, periodo, fechaNegociacion, ocultarMonto) {

        let options = [];
        let item = {};
        let saltoMeses = 1;
        if (periodo === "MENSUAL") {
            saltoMeses = 1;
        } else if (periodo === "BIMESTRAL") {
            saltoMeses = 2;
        } else if (periodo === "TRIMESTRAL") {
            saltoMeses = 3;
        } else if (periodo === "CUATRIMESTRAL") {
            saltoMeses = 4;
        } else if (periodo === "SEMESTRAL") {
            saltoMeses = 6;
        } else if (periodo === "ANUAL") {
            saltoMeses = 12;
        } else if (periodo === "UNICO_PAGO") {
            saltoMeses = 0;
        }

        let montoPorMes;

        if(ocultarMonto){
            montoPorMes =  montoTotal / cantidadDePagos;
        }

        let dateNegociacion = new Date(fechaNegociacion);
        // new Date(año_num,mes_num,dia_num)
        let fechaPago = new Date(dateNegociacion.getFullYear(), dateNegociacion.getMonth(), dateNegociacion.getDay());
        let mesActual = dateNegociacion.getMonth();
        for (let i = 0; i < cantidadDePagos; i++) {
            item.id = i + 1;
            item.monto = montoPorMes;
            item.pagoNumero = i + 1;
            fechaPago = new Date(dateNegociacion.getFullYear(), mesActual, dateNegociacion.getDay());
            item.fecha = fechaPago.toISOString();
            options.push(item);
            mesActual = mesActual + saltoMeses;
            item = {};
        }

        return options;

    }

    valueWasUpdated(prevProps) {

        /*return JSON.stringify(prevProps.value) !== JSON.stringify(this.props.value)
            && JSON.stringify(this.props.value) !== JSON.stringify(this.state.value);*/
    }

    optionsWereUpdated(prevProps) {

        /* return this.props.options
             && JSON.stringify(prevProps.options) !== JSON.stringify(this.props.options);*/
    }

    changeIndex(value, index) {

    }

    changeDate(value, index) {
        let fechaActual = value._d.toISOString();
        let { options } = this.state;
        options[index].fecha = fechaActual;
        this.setState({
            options
        });
        this.props.onChange(options, "medicionDesembolso");
    };

    changeMonto(value, index) {
        let { options } = this.state;
        options[index].monto = value.target.value;
        this.setState({
            options
        });

        this.props.onChange(options, "medicionDesembolso");
    };

    onChangeFecha(valor) {

        let fechas = this.state.fechas;
        let fechaActual = valor._d.toISOString();
        let fechaAnterior = valor._i;
        let index = fechas.indexOf(fechaAnterior);
        if (index > -1) {
            fechas[index] = fechaActual;
            this.state.fechas[index] = fechaActual;
            this.setState({
                fechas: fechas
            });
        }/*else{
            console.error("##### ERROR #####");
        }*/
    }
    render() {

        const {
            meta: { touched, error },
        } = this.props;
        return (
            <div style={{
                marginTop: 6
            }}>
                <div style={{ marginTop: 16 }}>
                    {
                        true &&
                        <Typography className="text-16 sm:text-16 truncate"></Typography>
                    }
                    <>
                        {
                            this.props.show &&
                            this.state.options.map((option, index) => {
                                const style = {};
                                return (
                                    <>
                                        <div key={index}>
                                            <Typography className="text-16 sm:text-16 truncate"><h3><strong>Pago numero {option.pagoNumero}</strong></h3></Typography>
                                            {this.props.ocultarMonto && <div> <Typography className="text-16 sm:text-16 truncate">Monto:</Typography>

                                                <TextField
                                                    id={"monto-" + (index + 1)}
                                                    type="number"
                                                    value={option.monto}
                                                    onChange={value => this.changeMonto(value, index)}
                                                />
                                            </div>
                                            }
                                            <Typography className="text-16 sm:text-16 truncate">Fecha Desembolso</Typography>
                                            <KeyboardDatePicker
                                                id={"fecha-" + (index + 1)}
                                                value={option.fecha}
                                                format="DD/MM/YYYY"
                                                onChange={value => this.changeDate(value, index)}
                                            />
                                            <br />
                                            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                                        </div>
                                    </>
                                );
                            })
                        }
                    </>
                </div>
                {
                    touched && error ?
                        <Alert severity="error" style={{ padding: '0px 8px' }}>
                            {error}
                        </Alert> :
                        <div style={{ height: 23, marginTop: 2, width: '100%' }} />
                }
            </div>
        );
    }
}

export default withStyles(styles)(RenderMultipleDatePicker);
