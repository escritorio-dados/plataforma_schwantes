import { CircularProgress } from '@mui/material';
import { blue } from '@mui/material/colors';

import { BackdropStyled } from './styles';

type ILoadingProps = { loading: boolean };

export function Loading({ loading }: ILoadingProps) {
  return (
    <BackdropStyled open={loading}>
      <CircularProgress sx={{ color: blue[700] }} size={75} />
    </BackdropStyled>
  );
}
