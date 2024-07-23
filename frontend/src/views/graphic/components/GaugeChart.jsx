import React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const GaugeChart = ({ velocidadPromedio, color }) => {
  const settings = {
    width: 200,
    height: 200,
    value: parseFloat(velocidadPromedio) || 0, // Convertir a número, manejar valor nulo o indefinido
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Gauge
        {...settings}
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: color,
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
      />
      <div
        style={{
          position: 'absolute',
          top: '70%',
          left: '50%',
          transform: 'translate(-50%, -30%)', // Ajusta esto según sea necesario
          fontSize: 20,
          textAlign: 'center',
          color: color, // Usa el mismo color que el arco del valor
        }}
      >
        km/h
      </div>
    </div>
  );

};

export default GaugeChart;
