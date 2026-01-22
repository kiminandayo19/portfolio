'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Code as CodeIcon,
  Architecture as ProjectIcon,
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useColorMode } from '@/components/ThemeRegistry/ThemeContextProvider';

// ... imports

const drawerWidth = 260; // Increased width for better spacing

const MENU_ITEMS = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  { text: 'Experiences', icon: <WorkIcon />, path: '/experiences' },
  { text: 'Projects', icon: <ProjectIcon />, path: '/projects' },
  { text: 'Skills', icon: <CodeIcon />, path: '/skills' },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const colorMode = useColorMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ px: 3, mb: 2 }}>
        <Typography variant="h5" noWrap component="div" sx={{
          background: theme.palette.mode === 'light'
            ? `linear-gradient(45deg, ${theme.palette.primary.main}, #0059B2)`
            : `linear-gradient(45deg, #3399FF, ${theme.palette.primary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 800,
          letterSpacing: '-0.02em',
        }}>
          Portfolio CMS
        </Typography>
      </Toolbar>
      <Box sx={{ px: 2, flexGrow: 1 }}>
        <List>
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={Link}
                  href={item.path}
                  selected={isActive}
                  onClick={isMobile ? handleDrawerToggle : undefined}
                  sx={{
                    borderRadius: '12px',
                    minHeight: 48,
                    color: isActive
                      ? (theme.palette.mode === 'light' ? theme.palette.primary.main : '#fff')
                      : 'text.secondary',
                    bgcolor: isActive
                      ? (theme.palette.mode === 'light' ? 'rgba(0, 127, 255, 0.1)' : 'rgba(51, 153, 255, 0.15)')
                      : 'transparent',
                    '&:hover': {
                      bgcolor: isActive
                        ? (theme.palette.mode === 'light' ? 'rgba(0, 127, 255, 0.15)' : 'rgba(51, 153, 255, 0.25)')
                        : 'rgba(0, 0, 0, 0.04)',
                    },
                    '&.Mui-selected': {
                      bgcolor: isActive
                        ? (theme.palette.mode === 'light' ? 'rgba(0, 127, 255, 0.1)' : 'rgba(51, 153, 255, 0.15)')
                        : 'transparent',
                      '&:hover': {
                        bgcolor: isActive
                          ? (theme.palette.mode === 'light' ? 'rgba(0, 127, 255, 0.15)' : 'rgba(51, 153, 255, 0.25)')
                          : 'rgba(0, 0, 0, 0.04)',
                      }
                    }
                  }}
                >
                  <ListItemIcon sx={{
                    minWidth: 40,
                    color: isActive
                      ? (theme.palette.mode === 'light' ? theme.palette.primary.main : '#fff')
                      : 'text.secondary'
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.95rem'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', opacity: 0.7 }}>
          v0.2.0 • Modern UI
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
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
          {/* Breadcrumbs or Page Title could go here */}
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <LightIcon /> : <DarkIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
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
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              border: 'none',
              bgcolor: 'background.default' // Blend with background for floating effect
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
