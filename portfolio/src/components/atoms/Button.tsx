'use client';

import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export interface ButtonProps extends MuiButtonProps {
  rounded?: boolean;
  target?: string;
  rel?: string;
}

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'rounded',
})<ButtonProps>(({ theme, rounded }) => ({
  borderRadius: rounded ? 50 : theme.shape.borderRadius,
  textTransform: 'none',
  fontWeight: 600,
  padding: '10px 24px',
}));

export const Button = (props: ButtonProps) => {
  return <StyledButton {...props} />;
};
