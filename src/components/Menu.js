// src/components/Menu.js
import React from 'react';
import { List, ListItem, ListItemText, Drawer } from '@mui/material';

// Компонент меню с списком лабораторных работ
const Menu = ({ labWorks, onLabClick }) => {
  return (
    <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
      <List>
        {labWorks.map((lab) => (
          <ListItem button key={lab.id} onClick={() => onLabClick(lab)}>
            <ListItemText primary={lab.title} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Menu;