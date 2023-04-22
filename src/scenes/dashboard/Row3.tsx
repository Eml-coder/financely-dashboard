import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { Box, useTheme } from '@mui/material';

import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '@/state/api';
import DashboardBox from '@/components/DashboardBox';
import BoxHeader from '@/components/BoxHeader';

const Row3 = () => {
  const { palette } = useTheme();
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();
  console.log(transactionData)

  const productColumns = [
    {
      field: '_id',
      headerName: 'id',
      flex: 1,
    },
    {
      field: 'expense',
      headerName: 'Expense',
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },

    {
      field: 'price',
      headerName: 'Price',
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionColumns = [
    {
      field: '_id',
      headerName: 'id',
      flex: 1,
    },
    {
      field: 'buyer',
      headerName: 'Buyer',
      flex: 0.67,
  
    },

    {
      field: 'amount',
      headerName: 'Amount',
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },

    {
      field: 'productIds',
      headerName: 'Count',
      flex: 0.1,
      renderCell: (params: GridCellParams) => (params.value as Array<string>).length,
    },
  ];

  return (
    <>
    {/* first grid with tables */}
      <DashboardBox gridArea='g'>
        <BoxHeader title='list of Products' sideText={`${productData?.length} products`} />
        <Box
          mt='0.5rem'
          p='0 0.5rem'
          height='75%'
          sx={{
            // change the default color of MUIDataGrid
            '& .MuiDataGrid-root': {
              color: palette.grey[300],
              border: 'none',
            },

            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${palette.grey[800]} `,
            },

            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${palette.grey[800]} `,
            },
            '& .MuiDataGrid-columnSeperator': {
              visibility: 'hidden',
            },
          }}>
          <DataGrid
            rows={productData || []}
            columns={productColumns}
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
          />
        </Box>
      </DashboardBox>
      {/* second grid with tables */}
      <DashboardBox gridArea='h'>
        {' '}
        <BoxHeader title='Recent Orders' sideText={`${transactionData?.length} latest transactions`} />
        <Box
          mt='1rem'
          p='0 0.5rem'
          height='80%'
          sx={{
            // change the default color of MUIDataGrid
            '& .MuiDataGrid-root': {
              color: palette.grey[300],
              border: 'none',
            },

            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${palette.grey[800]} `,
            },

            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${palette.grey[800]} `,
            },
            '& .MuiDataGrid-columnSeperator': {
              visibility: 'hidden',
            },
          }}>
          <DataGrid
            rows={transactionData || []}
            columns={transactionColumns}
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
          />
        </Box>
      </DashboardBox>
      {/* third grid left to right */}
      <DashboardBox gridArea='i'></DashboardBox>
      <DashboardBox gridArea='j'></DashboardBox>
    </>
  );
};

export default Row3;
