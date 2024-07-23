import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import axios from 'axios';
import { BASE_URL } from 'store/constant';
const API_BASE_URL = BASE_URL;

const TotalGrowthBarChart = ({ isLoading }) => {
  const theme = useTheme();
  const [value, setValue] = useState('today');
  const [comunaData, setComunaData] = useState([]);
  const { primary } = theme.palette.text;
  const divider = theme.palette.divider;
  const grey500 = theme.palette.grey[500];
  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;

  const status = [
    {
      value: 'today',
      label: 'Today',
    },
    {
      value: 'month',
      label: 'This Month',
    },
    {
      value: 'year',
      label: 'This Year',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/etapatransporte/`);
        const data = response.data;
        const comunaCounts = countSubidasPorComuna(data);
        setComunaData(comunaCounts);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state if needed
      }
    };

    if (!isLoading) {
      fetchData();
    }
  }, [isLoading]);

  useEffect(() => {
    const newChartData = {
      colors: [primary200, primaryDark, secondaryMain, secondaryLight],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: Object.keys(comunaData),
        labels: {
          style: {
            colors: Array(Object.keys(comunaData).length).fill(primary),
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary],
          },
        },
      },
      grid: { borderColor: divider },
      tooltip: { theme: 'light' },
      legend: { labels: { colors: grey500 } },
    };

    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
    }
  }, [primary200, primaryDark, secondaryMain, secondaryLight, primary, divider, isLoading, grey500, comunaData]);

  const countSubidasPorComuna = (data) => {
    const comunaCounts = {};

    data.forEach((item) => {
      const { comuna_subida } = item;
      if (comunaCounts[comuna_subida]) {
        comunaCounts[comuna_subida] += 1;
      } else {
        comunaCounts[comuna_subida] = 1;
      }
    });

    return comunaCounts;
  };

  const chartOptions = {
    series: [
      {
        name: 'Subidas por Comuna',
        data: Object.values(comunaData),
      },
    ],
    options: {
      chart: {
        id: 'bar-chart',
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: Object.keys(comunaData),
        labels: {
          style: {
            colors: Array(Object.keys(comunaData).length).fill(primary),
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary],
          },
        },
      },
      grid: { borderColor: divider },
      tooltip: { theme: 'light' },
      legend: { labels: { colors: grey500 } },
    },
  };

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={3} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle2">Cantidad de subidas por Comuna</Typography>
            </Grid>
            <Grid item xs={12}>
              <Chart options={chartOptions.options} series={chartOptions.series} type="bar" height={350} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalGrowthBarChart;
