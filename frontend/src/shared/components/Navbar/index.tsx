import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { orange } from '@mui/material/colors';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '#static/logo.png';

import { useAuth } from '#shared/hooks/auth';

import { menuUser } from './data';
import { LoginButton, LogoStyled } from './styles';

export function Navbar() {
  // const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
  const [anchorUser, setAnchorUser] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const { logged, signOut, user } = useAuth();

  const userSigla = useMemo(() => {
    if (!user) {
      return 'U';
    }

    return user.email[0].toUpperCase();
  }, [user]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <LogoStyled src={logo} alt="Logo" />
          </Link>

          {/* Box em Telas Pequenas */}
          {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="Menu Principal"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => setAnchorMenu(e.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorMenu)}
              onClose={() => setAnchorMenu(null)}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => {
                    navigate(page.url);
                    setAnchorMenu(null);
                  }}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}

          {/* Box em Telas Grandes */}
          {/* <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <MenuLinkButton key={page.title} onClick={() => navigate(page.url)}>
                {page.title}
              </MenuLinkButton>
            ))}
          </Box> */}

          {/* Menu Esquerdo */}
          <Box sx={{ marginLeft: 'auto' }}>
            {logged ? (
              <>
                <Tooltip title="Abrir Menu">
                  <IconButton onClick={(e) => setAnchorUser(e.currentTarget)} sx={{ p: 0 }}>
                    <Avatar sx={{ background: orange[400] }}>{userSigla}</Avatar>
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
              <LoginButton onClick={() => navigate('/auth')}>Entrar</LoginButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
