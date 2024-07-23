import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// third-party
import Chart from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //
import { BASE_URL } from 'store/constant';
const API_BASE_URL = BASE_URL;
const TotalOrderLineChartCard = ({ isLoading }) => {
  const theme = useTheme();
  const [timeValue, setTimeValue] = useState(true); // true for Month, false for Year
  const [chartData, setChartData] = useState(null);
  const [totalDataCount, setTotalDataCount] = useState(0);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/etapatransporte/`);
        const data = response.data;

        // Example logic to calculate data taken per day
        const dataByDay = {};

        data.forEach(item => {
          const date = new Date(item.tiempo_subida);
          const day = date.toLocaleDateString();
          if (dataByDay[day]) {
            dataByDay[day]++;
          } else {
            dataByDay[day] = 1;
          }
        });

        // Calculate total data count
        let totalCount = 0;
        Object.values(dataByDay).forEach(count => {
          totalCount += count;
        });

        // Prepare data for ApexCharts
        const categories = Object.keys(dataByDay);
        const series = Object.values(dataByDay);

        const chartData = {
          series: [{ data: series }],
          options: {
            chart: {
              id: 'line-chart',
              toolbar: {
                show: false
              }
            },
            xaxis: {
              categories: categories,
              labels: {
                show: true
              }
            },
            colors: [theme.palette.primary.light],
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth',
              width: 2
            },
            markers: {
              size: 5
            },
            grid: {
              borderColor: theme.palette.mode === 'dark' ? theme.palette.primary[700] : theme.palette.primary[200],
              strokeDashArray: 5,
              padding: {
                left: 0,
                right: 0
              }
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy'
              }
            }
          }
        };

        setChartData(chartData);
        setTotalDataCount(totalCount);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        // Handle error state if needed
      }
    };

    if (!isLoading) {
      fetchChartData();
    }
  }, [isLoading, theme.palette.primary.light, theme.palette.mode]);

  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <MainCard
          border={false}
          content={false}
          sx={{
            bgcolor: 'primary.dark',
            color: '#fff',
            overflow: 'hidden',
            position: 'relative',
            '&>div': {
              position: 'relative',
              zIndex: 5
            },
            '&:after': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: theme.palette.primary[800],
              borderRadius: '50%',
              top: { xs: -105, sm: -85 },
              right: { xs: -140, sm: -95 }
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: theme.palette.primary[800],
              borderRadius: '50%',
              top: { xs: -155, sm: -125 },
              right: { xs: -70, sm: -15 },
              opacity: 0.5
            }
          }}
        >
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        bgcolor: 'primary.800',
                        color: '#fff',
                        mt: 1
                      }}
                    >
                      <LocalMallOutlinedIcon fontSize="inherit" />
                    </Avatar>
                  </Grid>

                </Grid>
              </Grid>
              <Grid item sx={{ mb: 0.75 }}>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: '2.125rem',
                            fontWeight: 500,
                            mr: 1,
                            mt: 1.75,
                            mb: 0.75
                          }}
                        >
                          {timeValue ? `${totalDataCount}` : '$961'}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Avatar
                          sx={{
                            ...theme.typography.smallAvatar,
                            cursor: 'pointer',
                            bgcolor: 'primary.200',
                            color: 'primary.dark'
                          }}
                        >
                          <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                        </Avatar>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: 'primary.200'
                          }}
                        >
                          Cantidad de datos validos
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    {chartData && <Chart {...chartData} />}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </MainCard>
      )}
    </>
  );
};

TotalOrderLineChartCard.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalOrderLineChartCard;
