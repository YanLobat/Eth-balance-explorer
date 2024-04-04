import React from 'react';
import { useUnit } from 'effector-react';

import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { $progress } from './model';


export const ProgressBar: React.FC = () => {
    const progress = useUnit($progress)
    if (progress === 0 || progress === 100) {
        return null
    }
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={progress} />
            <Box
                sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}
            >
                <Typography
                variant="caption"
                component="div"
                color="text.secondary"
                >
                    {`${Math.round(progress)}%`}
                </Typography>
            </Box>
        </Box>
    );
};