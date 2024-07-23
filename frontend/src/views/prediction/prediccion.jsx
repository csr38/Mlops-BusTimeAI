import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Paper, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { BASE_URL } from 'store/constant';
const API_BASE_URL = BASE_URL;
// Funciones para desnormalizar los datos
const denormalizeColumn = (value, min_value, max_value) => (value * (max_value - min_value)) + min_value;
// Lista de nombres de los meses
const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const PredictionComponent = () => {
  const [prediction, setPrediction] = useState(null);
  const [inputData, setInputData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/predict-from-flask`); // Reemplaza con tu URL correcta
        
        const n = response.data.prediction;
        const p = {
          prediction: denormalizeColumn(n.prediction, 0, 3600),
        };

        
        setPrediction(p);
        
        // Desnormalizar los datos de entrada
        const normalizedData = response.data.input_data;
        const denormalizedData = {
          x_subida: denormalizeColumn(normalizedData[0], 200000, 800000),
          y_subida: denormalizeColumn(normalizedData[1], 0, 10000000),
          x_bajada: denormalizeColumn(normalizedData[2], 200000, 800000),
          y_bajada: denormalizeColumn(normalizedData[3], 0, 10000000),
          dist_ruta_paraderos: denormalizeColumn(normalizedData[4], 0, 20000),
          month_subida: denormalizeColumn(normalizedData[5], 1, 12),
          day_subida: denormalizeColumn(normalizedData[6], 1, 31),
          hour_subida: denormalizeColumn(normalizedData[7], 0, 23),
          minute_subida: denormalizeColumn(normalizedData[8], 0, 59),
        };

        setInputData(denormalizedData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000); // Consulta cada 15 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <MainCard title="Prediccion Velocidad">

      <Grid item xs={12} sm={10} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom style={{ borderBottom: '2px solid #3f51b5', paddingBottom: '10px' }}>
              Predicciones
            </Typography>
            {error && (
              <Paper elevation={3} style={{ padding: '16px', marginTop: '16px', backgroundColor: '#ffeeee' }}>
                <Typography color="error">Error: {error}</Typography>
              </Paper>
            )}
            {prediction && (
              <Paper elevation={3} style={{ padding: '16px', marginTop: '16px', backgroundColor: '#e3f2fd' }}>
                <Box>
                  <Typography variant="body1" paragraph>
                    <strong>Predicción(Minutos):</strong> {(prediction.prediction/60).toFixed(2)}
                  </Typography>
                </Box>
              </Paper>
            )}
            <Typography variant="h5" gutterBottom style={{ padding: '16px', marginTop: '16px', borderBottom: '2px solid #3f51b5', paddingBottom: '10px' }}>
              Datos usados para la prediccion
            </Typography>
            {inputData && (
              <Paper elevation={3} style={{ padding: '16px', marginTop: '16px', backgroundColor: '#f0f4c3' }}>
                <Box>
                  <Typography variant="body1" paragraph>
                    <strong>Subida coordenada X:</strong> {inputData.x_subida.toFixed(2)}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Subida coordenada Y:</strong> {inputData.y_subida.toFixed(2)}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Bajada coordenada X:</strong> {inputData.x_bajada.toFixed(2)}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Bajada coordenada Y:</strong> {inputData.y_bajada.toFixed(2)}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Distancia entre paraderos(km):</strong> {(inputData.dist_ruta_paraderos/1000).toFixed(2)}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Mes:</strong> {monthNames[Math.floor(inputData.month_subida) - 1]}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Día:</strong> {inputData.day_subida.toFixed(0)}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Hora:</strong> {inputData.hour_subida.toFixed(0)}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Minuto:</strong> {inputData.minute_subida.toFixed(0)}
                  </Typography>
                </Box>
              </Paper>
            )}
          </CardContent>
        </Card>
      </Grid>

    </MainCard>
  );
};

export default PredictionComponent;
