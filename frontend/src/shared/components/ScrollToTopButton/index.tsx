import { ArrowUpward } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useCallback, useState } from 'react';

import { ScrollContainer } from './styles';

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = useCallback(() => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  window.addEventListener('scroll', toggleVisible);

  if (!visible) return <></>;

  return (
    <ScrollContainer>
      <Tooltip title="Voltar ao Inicio">
        <IconButton
          size="small"
          onClick={scrollToTop}
          sx={{
            background: '#242f5c',
            transition: 'filter 0.2s',
            '&:hover': { background: '#242f5c', filter: 'brightness(0.8)' },
          }}
        >
          <ArrowUpward fontSize="medium" sx={{ color: '#fff' }} />
        </IconButton>
      </Tooltip>
    </ScrollContainer>
  );
}
