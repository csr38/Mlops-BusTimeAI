import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { BASE_URL } from 'store/constant';
const API_BASE_URL = BASE_URL;

const TablaEjemplo = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/etapatransporte/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'tiempo_subida', headerName: 'Tiempo Subida', width: 200 },
        { field: 'tiempo_bajada', headerName: 'Tiempo Bajada', width: 200 },
        { field: 'tiempo_etapa', headerName: 'Tiempo Etapa', width: 150 },
        { field: 'x_subida', headerName: 'X Subida', width: 150 },
        { field: 'y_subida', headerName: 'Y Subida', width: 150 },
        { field: 'x_bajada', headerName: 'X Bajada', width: 150 },
        { field: 'y_bajada', headerName: 'Y Bajada', width: 150 },
        { field: 'dist_ruta_paraderos', headerName: 'Dist. Ruta Paraderos', width: 200 },
        { field: 'servicio_subida', headerName: 'Servicio Subida', width: 150 },
        { field: 'par_subida', headerName: 'Parada Subida', width: 150 },
        { field: 'par_bajada', headerName: 'Parada Bajada', width: 150 },
        { field: 'comuna_subida', headerName: 'Comuna Subida', width: 150 },
        { field: 'comuna_bajada', headerName: 'Comuna Bajada', width: 150 },
        { field: 'patente', headerName: 'Patente', width: 150 }
    ];

    return (
        <MainCard title="Tabla Ejemplo">
            <div style={{ height: '75vh', width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    loading={loading}
                    pageSize={10}
                    rowsPerPageOptions={[10, 20, 50]}
                    components={{ Toolbar: GridToolbar }}
                />
            </div>
        </MainCard>
    );
};

export default TablaEjemplo;
