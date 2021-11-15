import React from 'react';
import {Icon, IconButton, Paper, Typography} from '@material-ui/core';
import moment from 'moment';
import {withRouter} from 'react-router-dom';
import {Pie, PieChart, Tooltip, Cell} from 'recharts';
import _ from '@lodash';

const COLORS = [
  '#0336FF',
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FFDE03',
  '#B00020',
  '#6002EE'
];

class AnalistasConNegociaciones extends React.Component {

  _isMounted = false;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {history, negociacionesPorAnalista, getNegociacionesPorAnalista} = this.props;
    const data = negociacionesPorAnalista.map(n => (
      {
        name: n.nombre,
        value: n.cantidad
      }
    ));
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'}
              dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
    const mesYAnho = moment(new Date()).format('MM / YYYY');
    const existeDatos = _.reduce(data, (sum, analista) => sum + analista.value, 0);
    return (
      <Paper className="w-full rounded-8 shadow-none border-1">
        <div className="flex items-center justify-between px-4 pt-4">
          <Typography
            className="text-16 px-12">Negociaciones por Analista
            - {mesYAnho}</Typography>
          <IconButton
            aria-label="more"
            onClick={getNegociacionesPorAnalista}>
            <Icon>refresh</Icon>
          </IconButton>
        </div>
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          {
            existeDatos > 0 ?
              <PieChart width={400} height={320}>
                <Pie
                  data={data}
                  cx={200}
                  cy={160}
                  outerRadius={120}
                  labelLine={false}
                  dataKey="value"
                  label={renderCustomizedLabel}
                  fill="#8884d8">
                  {
                    data.map((entry, index) => <Cell key={index}
                                                     fill={COLORS[index % COLORS.length]}/>)
                  }
                </Pie>
                <Tooltip/>
              </PieChart> :
              <div style={{width: 400, height: 320, display: 'flex', justifyContent: 'center'}}>
                <span style={{alignSelf: 'center'}}>Sin datos...</span>
              </div>
          }
        </div>
      </Paper>
    );
  }
}

export default withRouter(AnalistasConNegociaciones);
