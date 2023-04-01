import { useMemo } from 'react';
import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';
import { useTheme } from '@mui/material';

import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from 'recharts';
import BoxHeader from '@/components/BoxHeader';

type Props = {};

const Row1 = (props: Props) => {
  const { palette } = useTheme();
  const { data } = useGetKpisQuery();
  console.log('data:', data);
  // run data only when data changes
  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        };
      })
    );
  }, [data]);

  return (
    <>
      <DashboardBox gridArea='a'>
        <BoxHeader title='Revenue and Expenses' sideText='+5%' subtitle='Top line represents revenue, bottom line represents expenses' />
        {/* begin first chart insert frm recharts */}
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 20,
              left: -15,
              bottom: 50,
            }}>
            {/* gradient background */}
            <defs>
              <linearGradient id='colorRevenue' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor={palette.primary[500]} stopOpacity={0.7} />
                <stop offset='95%' stopColor={palette.primary.main[500]} stopOpacity={0} />
              </linearGradient>
              {/* second chart gradient */}
              <linearGradient id='colorExpenses' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor={palette.primary[500]} stopOpacity={0.7} />
                <stop offset='95%' stopColor={palette.primary.main[500]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey='name' tickLine={false} style={{ fontSize: '10px' }} />
            <YAxis
              tickLine={false}
              style={{ fontSize: '10px' }}
              axisLine={{ strokeWidth: '0' }}
              domain={[8000, 23000]}
            />
            <Tooltip />
            {/* chart lines and color */}
            <Area
              type='monotone'
              dataKey='revenue'
              dot={true}
              stroke={palette.primary.main}
              fill='url(#colorRevenue)'
              fillOpacity={1}
            />
            <Area
              type='monotone'
              dataKey='expenses'
              dot={true}
              stroke={palette.primary.main}
              fill='url(#colorExpenses)'
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea='b'></DashboardBox>
      <DashboardBox gridArea='c'></DashboardBox>
    </>
  );
};

export default Row1;
