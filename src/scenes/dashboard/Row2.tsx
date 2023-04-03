import React, { useMemo } from 'react';
import { useTheme } from '@mui/material';

import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
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
 
} from "recharts";



const Row2 = () => {
  const { palette } = useTheme();
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  console.log('operationalData:', operationalData);
  console.log('productData:', productData);


  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
        return {
          name: month.substring(0, 3),
         'Operational Expenses': operationalExpenses,
      'Non Operational Expenses': nonOperationalExpenses,
        };
      })
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

        <ResponsiveContainer width='100%' height='100%'  >
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

      {/* 2nd chart */}


   
      <DashboardBox gridArea='e'></DashboardBox>
      <DashboardBox gridArea='f'></DashboardBox>
    </>
  );
};

export default Row2;
