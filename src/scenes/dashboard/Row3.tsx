import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { Box, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';

import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '@/state/api';
import DashboardBox from '@/components/DashboardBox';
import BoxHeader from '@/components/BoxHeader';
import FlexBetween from '@/components/FlexBetween';
import { Cell, Pie, PieChart } from 'recharts';


const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300], palette.primary[100]];
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();
  console.log(transactionData);

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(([key, value]) => {
        return [
          { name: key, value: value },
          {
            name: `${key} of Total`,
            value: totalExpenses - value,
          },
        ];
      });
    }
  }, [kpiData]);

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
        <BoxHeader
          title='Recent Orders'
          sideText={`${transactionData?.length} latest transactions`}
        />
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
      {/* third grid left to right 3 circular charts */}
      <DashboardBox gridArea='i'>
        <BoxHeader title='Expense Breakdown By Category' sideText='+5%' />
        <FlexBetween mt='0.5rem' gap='0.5rem' p='0 1rem' textAlign='center'>
          {/* loop over the piechart */}
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={70} height={70}>
                <Pie
                  data={data}
                  stroke='none'
                  innerRadius={18}
                  outerRadius={35}
                  fill='#8884d8'
                  paddingAngle={2}
                  dataKey='value'>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant='h5'>{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea='j'>
        <BoxHeader title='Overall Summary' sideText='+25%' />
        <Box
        height='15px'
        margin='1.2rem 1rem 0.4rem 1rem'
        borderRadius='1rem'
        bgcolor={palette.primary[800]}
        >
          <Box
          height='15px'
             borderRadius='1rem'
             bgcolor={palette.primary[600]}
             width='40%'>

          </Box>
        </Box>
    
          <Typography variant='h5' textAlign='center' color='primary'>
            $ {kpiData?.[0].totalExpenses} 
          </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;
