import { useMemo } from 'react';
import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';
import { useTheme } from '@mui/material';

import {
  ResponsiveContainer,
  AreaChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Area,
  CartesianGrid,
  Legend,
  LineChart,
} from 'recharts';
import BoxHeader from '@/components/BoxHeader';

const Row1 = () => {
  const { palette } = useTheme();
  const { data } = useGetKpisQuery();
  console.log('data:', data);
  // run data only when data changes
  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
        };
      })
    );
  }, [data]);

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
  // second chart
  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: (revenue - expenses).toFixed(2),
        };
      })
    );
  }, [data]);

  return (
    <>
      <DashboardBox gridArea='a'>
        <BoxHeader
          title='Revenue and Expenses'
          sideText='+5%'
          subtitle='Top line represents revenue, bottom line represents expenses'
        />
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

      {/* second chart */}
      <DashboardBox gridArea='b'>
        <BoxHeader
          title='Profit and Revenue'
          sideText='+5%'
          subtitle='Top line represents revenue, bottom line represents expenses'
        />

        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            width={500}
            height={400}
            data={revenueProfit}
            margin={{
              top: 15,
              right: 0,
              left: -15,
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

            <Legend
              height={20}
              wrapperStyle={{
                margin: '0 0 10px 0',
              }}
            />

            <Line yAxisId='left' type='monotone' dataKey='profit' stroke={palette.tertiary[500]} />
            <Line yAxisId='right' type='monotone' dataKey='revenue' stroke={palette.primary.main} />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      {/* 3rd barchart frm left to right horizontal chart*/}
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Revenue Month by Month"
          subtitle="graph representing the revenue month by month"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
