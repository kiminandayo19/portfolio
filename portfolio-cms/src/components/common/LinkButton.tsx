'use client';

import React from 'react';
import Link from 'next/link';
import { Button, ButtonProps } from '@mui/material';

interface LinkButtonProps extends ButtonProps {
  href: string;
}

export default function LinkButton({ href, ...props }: LinkButtonProps) {
  return (
    <Button component={Link} href={href} {...props} />
  );
}
