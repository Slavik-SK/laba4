import React from 'react';
import { Box, Typography } from '@mui/material';

const Header = ({ title, children }) => {
  return (
    <Box 
      component="header" 
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Header;