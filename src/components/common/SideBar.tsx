import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import React, { CSSProperties } from 'react';
import { NavLink } from "react-router-dom";

interface SidebarProps {
    drawerWidth: number, 
    mobileOpen: boolean, 
    handleDrawerToggle: ()=> void
}

interface menuItem{
  text: string,
  path: string,
  icon: React.ComponentType,
}

const SideBar = ({drawerWidth, mobileOpen, handleDrawerToggle}:SidebarProps) => {  
  const MenuItems:menuItem[] = [
    {text: "Home", path: "/", icon: HomeIcon},
    {text: "月間レポート", path: "/report", icon: EqualizerIcon},
  ]
  const baseLinkStyle :CSSProperties ={
    textDecoration: "none",
    color: "inherit",
    display: "black"
  }
  const activeLinkStyle:CSSProperties = {
    backgroundColor: "rgba(0,0,0,0.08)"
  };
 
  const drawer = (
            <div>
              <Toolbar />
              <Divider />
              <List>
              {MenuItems.map((item, index) => (
                <NavLink key={item.text} to={item.path} style={({isActive}) => {
                  return {
                    ...baseLinkStyle,
                    ...(isActive ? activeLinkStyle : {})

                 }
                }} >
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <item.icon />
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                </NavLink>
                ))}
              </List>
            </div>
          );
        
    return (
        <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
        >
        {/* モバイル用 */}
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
        {/* PC用 */}
        <Drawer
          variant="permanent"
        sx={{
            display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
>
          {drawer}
        </Drawer>
        </Box>
)}

export default SideBar;