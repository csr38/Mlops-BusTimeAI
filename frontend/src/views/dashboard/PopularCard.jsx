import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, CardContent, CardActions, Button, Avatar, Menu, MenuItem, Divider } from '@mui/material';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { BASE_URL } from 'store/constant';
const API_BASE_URL = BASE_URL;
const PopularCard = ({ isLoading }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([]);

  // Función para obtener datos de la API (simulando una llamada a Django backend)
  const fetchData = async () => {
    // Aquí deberías hacer una llamada real a tu backend Django para obtener los datos
    // Por simplicidad, simularemos datos estáticos
    const response = await fetch(`${API_BASE_URL}/api/etapatransporte/`);
    const data = await response.json();
    setData(data.slice(0, 5)); // Mostrar solo los primeros 5 datos recibidos
  };

  useEffect(() => {
    fetchData(); // Llama a fetchData cuando el componente se monta
  }, []); // El segundo argumento vacío [] significa que se ejecuta solo una vez al montar el componente

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h4">Buses en La Serena - Ultimos datos subidos</Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="body1">Recorrido - patente</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" align="right">Tiempo en segundos</Typography>
                </Grid>
              </Grid>
            </Grid>
     
             
              {data.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <Grid container direction="column">
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            {item.servicio_subida} - {item.patente}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                {item.dist_ruta_paraderos.toFixed(2)}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Avatar
                                variant="rounded"
                                sx={{
                                  width: 16,
                                  height: 16,
                                  borderRadius: '5px',
                                  bgcolor: item.tiempo_etapa > 0 ? 'success.light' : 'orange.light',
                                  color: item.tiempo_etapa > 0 ? 'success.dark' : 'orange.dark',
                                  ml: 2
                                }}
                              >
                                {item.tiempo_etapa > 0 ? (
                                  <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                ) : (
                                  <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                )}
                              </Avatar>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2" sx={{ color: item.tiempo_etapa > 0 ? 'success.dark' : 'orange.dark' }}>
                        {item.tiempo_etapa > 0 ? 'TiempoEtapa/Promedio' : 'Loss'} {Math.abs(item.tiempo_etapa).toFixed(2)}%
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1.5 }} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
 
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
