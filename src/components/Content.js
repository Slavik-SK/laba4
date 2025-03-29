// src/components/Content.js
import React from 'react';
import { Paper, Typography } from '@mui/material';

const Content = ({ lab }) => {
  // Разбиваем контент на предложения, используя точки как разделители.
  const sentences = lab.content.split('. ').map(sentence => sentence.trim()).filter(sentence => sentence !== '');

  return (
    <Paper elevation={3} style={{ padding: '16px', margin: '16px', flexGrow: 1 }}>
      <Typography variant="h4">{lab.title}</Typography>
      {sentences.map((sentence, index) => (
        <Typography key={index} variant="body1" style={{ marginBottom: '8px' }}>
          {sentence}. {/* Возвращаем точку в конце каждого предложения */}
        </Typography>
      ))}
    </Paper>
  );
};

export default Content;

