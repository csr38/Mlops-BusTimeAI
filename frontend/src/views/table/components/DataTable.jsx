import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const DataTable = ({ data, loading, columns}) => {
    return (
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
    );
};

export default DataTable;
