"use client"; // Add this line at the top

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Logo from '../../public/assets/yoruba.png'; // Adjust the path as needed
import YorubaCities from './OrikiCities'; // Import your YorubaCities component
import OrikiHome from './OrikiHome'; // Import your OrikiHome component
import Link from 'next/link';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

const navItems = [
  { name: 'Home', action: 'renderHome' },
  { name: 'Yoruba Cities', action: 'renderCities' }, // Use action instead of path
];

export default function OrikiAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeComponent, setActiveComponent] = React.useState<string | null>(null); // State to manage the active component

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNavItemClick = (action: string) => {
    if (action === 'renderCities') {
      setActiveComponent('YorubaCities'); // Set the active component to YorubaCities
    } else if (action === 'renderHome') {
      setActiveComponent('OrikiHome'); // Set the active component to OrikiHome
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Oriki Yoruba
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleNavItemClick(item.action)}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#fff', color: '#000' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* Logo on the left */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo.src} alt="Logo" style={{ height: '40px', marginRight: '8px' }} />
            <Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Oriki Ile Yoruba
            </Typography>


             {/* Outlined button beside the logo with Link */}
          <Link href="./app/oriki" passHref>
            <Button variant="outlined" sx={{ marginLeft: 2 }}>
              Learn Oriki Ile Yoruba
            </Button>
          </Link>
          
          
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 'auto' }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                sx={{ color: '#000' }}
                onClick={() => handleNavItemClick(item.action)} // Use onClick to handle actions
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      {/* Render the active component based on the state */}
      {activeComponent === 'YorubaCities' && <YorubaCities />}
      {activeComponent === 'OrikiHome' && <OrikiHome />}
    </Box>
  );
}