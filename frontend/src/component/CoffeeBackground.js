import React from 'react';
import { Box } from '@mui/material';

export default function CoffeeBackground({ children }) {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(to bottom, #d7c4a3, #a67c52)',
                backgroundAttachment: 'fixed',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {children}
        </Box>
    );
}