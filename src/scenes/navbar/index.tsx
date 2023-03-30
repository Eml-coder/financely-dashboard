import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { Box, useTheme, Typography } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';

type Props = {};

const Navbar = (props: Props) => {
    const { palette } = useTheme();
    const [active, setActive] = useState('dashboard');
    return (
        <FlexBetween mb='0.25rem' p='0.5rem 0rem' color={palette.grey[300]}>
            {/* LEFT SIDE */}
            <FlexBetween gap='0.75rem'>
                <AnalyticsIcon sx={{ fontSize: '28px' }} />
                <Typography variant='h4'>Financely</Typography>
            </FlexBetween>
            {/* RIGHT SIDE */}
            <FlexBetween gap='2rem'>
                <Box sx={{ '&:hover': { color: palette.primary[100] } }}>
                    <Link
                        to='/'
                        onClick={() => setActive('dashboard')}
                        style={{
                            color: active === 'dashboard' ? 'inherit' : palette.grey[700],
                            textDecoration: 'inherit',
                        }}>
                        Dashboard
                    </Link>
                </Box>

                <Box sx={{ '&:hover': { color: palette.primary[100] } }}>
                    <Link
                        to='/predictions'
                        onClick={() => setActive('predictions')}
                        style={{
                            color: active === 'predictions' ? 'inherit' : palette.grey[700],
                            textDecoration: 'inherit',
                        }}>
                        Predictions
                    </Link>
                </Box>
            </FlexBetween>
        </FlexBetween>
    );
};

export default Navbar;
