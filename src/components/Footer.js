// src/components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

// Компонент подвала сайта
const Footer = ({ text }) => {
  return (
    <Box component="footer" sx={{ py: 3, bgcolor: 'grey.200', textAlign: 'center' }}>
      <Typography variant="subtitle1">{text}</Typography>
    </Box>
  );
};

export default Footer;