import { AccountCircle } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '#static/logo.svg';

import { useAuth } from '#shared/hooks/auth';
import { DEFAULT_USER_ID } from '#shared/types/backend/IUser';

import { menuUser } from './data';
import { Logo, NavBar, NavLink, TopBar } from './styles';

export function Navbar() {
  const [anchorUser, setAnchorUser] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const { logged, signOut, user } = useAuth();

  return (
    <TopBar>
      <Logo src={logo} alt="logo" />

      <NavBar>
        <NavLink to="/">Página Inicial</NavLink>

        <NavLink to="/#about">Sobre</NavLink>

        <NavLink to="/#bio">Biografia</NavLink>

        <NavLink to="/#dados">Dados do Acervo</NavLink>

        <NavLink to="/#expediente">Expediente</NavLink>

        <Box sx={{ marginLeft: 'auto' }}>
          {logged ? (
            <>
              <Tooltip title="Abrir Menu">
                <IconButton onClick={(e) => setAnchorUser(e.currentTarget)} sx={{ p: '1px' }}>
                  <AccountCircle fontSize="large" sx={{ color: '#252d4f' }} />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-user"
                anchorEl={anchorUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorUser)}
                onClose={() => setAnchorUser(null)}
              >
                {user.id === DEFAULT_USER_ID && (
                  <MenuItem
                    onClick={() => {
                      setAnchorUser(null);

                      navigate('/users');
                    }}
                  >
                    <Typography textAlign="center">Gerenciar Usuarios</Typography>
                  </MenuItem>
                )}

                {menuUser.map((menu) => (
                  <MenuItem
                    key={menu.title}
                    onClick={() => {
                      setAnchorUser(null);

                      navigate(menu.url);
                    }}
                  >
                    <Typography textAlign="center">{menu.title}</Typography>
                  </MenuItem>
                ))}

                <MenuItem
                  onClick={() => {
                    setAnchorUser(null);

                    signOut();
                  }}
                >
                  <Typography textAlign="center">Sair</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <NavLink className="login" to="/auth">
              Login
            </NavLink>
          )}
        </Box>
      </NavBar>
    </TopBar>
  );
}
