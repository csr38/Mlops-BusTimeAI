import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import GaugeChart from './components/GaugeChart'; // Importamos el componente GaugeChart
import { TextField, MenuItem } from '@mui/material'; // Importamos componentes de MUI
import { BASE_URL } from 'store/constant';
const API_BASE_URL = BASE_URL;

const GraficosEjemplo = () => {
  const [micros, setMicros] = useState([]); // Estado para almacenar las micros disponibles
  const [selectedMicro, setSelectedMicro] = useState(''); // Estado para la micro seleccionada
  const [speedData, setSpeedData] = useState({ promedio: 0, minima: 0, maxima: 0 }); // Estado para almacenar las velocidades
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  useEffect(() => {
    // Función para obtener las micros disponibles y calcular velocidades
    const fetchMicros = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/etapatransporte/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();

        // Agrupar datos por patente
        const datosAgrupados = jsonData.reduce((acc, cur) => {
          if (!acc[cur.patente]) {
            acc[cur.patente] = [];
          }
          acc[cur.patente].push(cur);
          return acc;
        }, {});

        // Calcular velocidades por patente
        const velocidadesPorMicro = Object.keys(datosAgrupados).map(patente => {
          const datosMicro = datosAgrupados[patente];
          const tiempoTotal = datosMicro.reduce((acc, cur) => acc + cur.tiempo_etapa, 0);
          const distanciaTotal = datosMicro.reduce((acc, cur) => acc + cur.dist_ruta_paraderos, 0);
          const velocidades = datosMicro.map(item => {
            const distanciaKm = item.dist_ruta_paraderos / 1000; // Convertir metros a kilómetros
            const tiempoHoras = item.tiempo_etapa / 3600; // Convertir segundos a horas
            return distanciaKm / tiempoHoras; // Calcular velocidad en km/h
          });

          const velocidadPromedio = velocidades.reduce((acc, cur) => acc + cur, 0) / velocidades.length;
          const velocidadMinima = Math.min(...velocidades);
          const velocidadMaxima = Math.max(...velocidades);

          return {
            patente,
            promedio: velocidadPromedio.toFixed(2),
            minima: velocidadMinima.toFixed(2),
            maxima: velocidadMaxima.toFixed(2),
          };
        });

        setMicros(velocidadesPorMicro);
        if (velocidadesPorMicro.length > 0) {
          setSelectedMicro(velocidadesPorMicro[0].patente); // Establecer la primera micro como seleccionada inicialmente
        }
      } catch (error) {
        console.error('Error fetching micros:', error);
      }
    };

    // Llamar a fetchMicros al montar el componente
    fetchMicros();
  }, []);

  useEffect(() => {
    if (selectedMicro) {
      const microData = micros.find(micro => micro.patente === selectedMicro);
      if (microData) {
        setSpeedData(microData);
      } else {
        setSpeedData({ promedio: 0, minima: 0, maxima: 0 }); // Reiniciar speedData si no hay datos para la micro seleccionada
      }
    } else {
      setSpeedData({ promedio: 0, minima: 0, maxima: 0 }); // Reiniciar speedData si no hay micro seleccionada
    }
  }, [selectedMicro, micros]);

  // Filtrar micros basados en el término de búsqueda
  const filteredMicros = micros.filter(micro => micro.patente.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <MainCard title="Gráfico de Velocidad por Micro">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <TextField
          id="search"
          label="Buscar Micro"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '20px', width: '300px' }}
        />
        <TextField
          id="microSelector"
          select
          label="Selecciona una micro"
          value={selectedMicro}
          onChange={(e) => setSelectedMicro(e.target.value)}
          style={{ marginBottom: '20px', width: '300px' }}
        >
          {filteredMicros.map((micro, index) => (
            <MenuItem key={index} value={micro.patente}>{micro.patente}</MenuItem>
          ))}
        </TextField>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <GaugeChart velocidadPromedio={parseFloat(speedData.minima)} color="green" />
            <p style={{ color: 'green' }}>Velocidad Mínima</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <GaugeChart velocidadPromedio={parseFloat(speedData.promedio)} color="blue" />
            <p style={{ color: 'blue' }}>Velocidad Promedio</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <GaugeChart velocidadPromedio={parseFloat(speedData.maxima)} color="red" />
            <p style={{ color: 'red' }}>Velocidad Máxima</p>
          </div>
        </div>
      </div>
    </MainCard>
  );
};

export default GraficosEjemplo;
