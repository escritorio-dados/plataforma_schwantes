import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo2 from '#static/logo_small.png';
import logo from '#static/logo.svg';

import { useAuth } from '#shared/hooks/auth';
import { DEFAULT_USER_ID } from '#shared/types/backend/IUser';

import { menuUser } from './data';
import { AuthSm, Logo, NavBar, NavLink, NavLinkSm, TopBar } from './styles';

export function Navbar() {
  const [anchorUserSmall, setAnchorUserSmall] = useState<null | HTMLElement>(null);
  const [anchorUser, setAnchorUser] = useState<null | HTMLElement>(null);
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const { logged, signOut, user } = useAuth();

  return (
    <TopBar>
      <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
        <Logo src={logo} alt="logo" />
      </Box>

      <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
        <img src={logo2} alt="logo" />
      </Box>

      {/* Telas Menores que 900px */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, marginLeft: 'auto', alignItems: 'center' }}>
        {/* Botão de Login */}
        <Box>
          {logged ? (
            <>
              <Tooltip title="Abrir Menu">
                <IconButton onClick={(e) => setAnchorUserSmall(e.currentTarget)} sx={{ p: '1px' }}>
                  <AccountCircle fontSize="large" sx={{ color: '#fff' }} />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: '5px' }}
                id="menu-user-small"
                anchorEl={anchorUserSmall}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorUserSmall)}
                onClose={() => setAnchorUserSmall(null)}
              >
                {user.id === DEFAULT_USER_ID && (
                  <MenuItem
                    onClick={() => {
                      setAnchorUserSmall(null);

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
                      setAnchorUserSmall(null);

                      navigate(menu.url);
                    }}
                  >
                    <Typography textAlign="center">{menu.title}</Typography>
                  </MenuItem>
                ))}

                <MenuItem
                  onClick={() => {
                    setAnchorUserSmall(null);

                    signOut();
                  }}
                >
                  <Typography textAlign="center">Sair</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <AuthSm to="/auth">Login</AuthSm>
          )}
        </Box>

        {/* Menu de Navegação */}
        <Box sx={{ marginLeft: '1rem' }}>
          <Tooltip title="Abrir Menu">
            <IconButton onClick={(e) => setAnchorMenu(e.currentTarget)} sx={{ p: '1px' }}>
              <MenuIcon fontSize="large" sx={{ color: '#fff' }} />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: '5px' }}
            id="menu-nav"
            anchorEl={anchorMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorMenu)}
            onClose={() => setAnchorMenu(null)}
          >
            <MenuItem sx={{ padding: 0 }} onClick={() => setAnchorMenu(null)}>
              <NavLinkSm to="/">Página Inicial</NavLinkSm>
            </MenuItem>

            <MenuItem sx={{ padding: 0 }} onClick={() => setAnchorMenu(null)}>
              <NavLinkSm to="/#about">Sobre</NavLinkSm>
            </MenuItem>

            <MenuItem sx={{ padding: 0 }} onClick={() => setAnchorMenu(null)}>
              <NavLinkSm to="/#bio">Biografia</NavLinkSm>
            </MenuItem>

            <MenuItem sx={{ padding: 0 }} onClick={() => setAnchorMenu(null)}>
              <NavLinkSm to="/#dados">Dados do Acervo</NavLinkSm>
            </MenuItem>

            <MenuItem sx={{ padding: 0 }} onClick={() => setAnchorMenu(null)}>
              <NavLinkSm to="/#expediente">Expediente</NavLinkSm>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Telas Maiores que 900px */}
      <NavBar sx={{ display: { xs: 'none', md: 'flex' } }}>
        <NavLink to="/">Página Inicial</NavLink>

        <NavLink to="/#about">Sobre</NavLink>

        <NavLink to="/#bio">Biografia</NavLink>

        <NavLink to="/#dados">Dados do Acervo</NavLink>

        <NavLink to="/#expediente" sx={{ mr: '1rem' }}>
          Expediente
        </NavLink>

        <Box sx={{ marginLeft: 'auto' }}>
          {logged ? (
            <>
              <Tooltip title="Abrir Menu">
                <IconButton onClick={(e) => setAnchorUser(e.currentTarget)} sx={{ p: '1px' }}>
                  <AccountCircle fontSize="large" sx={{ color: '#fff' }} />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: '5px' }}
                id="menu-user"
                anchorEl={anchorUser}
                anchorOrigin={{
                  vertical: 'bottom',
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
