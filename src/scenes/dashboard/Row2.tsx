import React, { useMemo } from 'react';
import { ThemeProvider, useTheme } from '@mui/material';
import {Box, Typography} from '@mui/material';

import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api';

import {
  Tooltip,
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// pie data

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const Row2 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300], palette.primary[100]];
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            'Operational Expenses': operationalExpenses,
            'Non Operational Expenses': nonOperationalExpenses,
          };
        },
      )
    );
  }, [operationalData]);

  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price: price,
          expense: expense,
        };
      })
    );
  }, [productData]);
  return (
    <>
      {/* first chart */}
      <DashboardBox gridArea='d'>
        <BoxHeader title='Operational vs Non-Operational Expenses' sideText='+5%' />

        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={operationalExpenses}
            // width={500}
            // height={400}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis dataKey='name' tickLine={false} style={{ fontSize: '10px' }} />
            <YAxis
              yAxisId='left'
              orientation='left'
              tickLine={false}
              style={{ fontSize: '10px' }}
              axisLine={false}
            />

            <YAxis
              yAxisId='right'
              orientation='right'
              tickLine={false}
              style={{ fontSize: '10px' }}
              axisLine={false}
            />
            <Tooltip />

            <Line
              yAxisId='left'
              type='monotone'
              dataKey='Non Operational Expenses'
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='Operational Expenses'
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      {/* end first chart */}

      {/* 2nd chart pie round */}

      <DashboardBox gridArea='e'>
        <BoxHeader title='Campaingns and Targets' sideText='+4%' />
        <FlexBetween mt='0.25rem' gap='1.5rem' pr='1rem'>
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}>
            <Pie
              data={pieData}
              stroke='none'
              innerRadius={18}
              outerRadius={38}
              fill='#8884d8'
              paddingAngle={2}
              dataKey='value'>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">
              Finance goals of the campaign that is desired
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography mt="0.4rem" variant="h5">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Margins are up by 30% from last month.
            </Typography>
          </Box>
     
        </FlexBetween>
      </DashboardBox>

      {/* 3rd chart */}
      <DashboardBox gridArea='f'></DashboardBox>
    </>
  );
};

export default Row2;
