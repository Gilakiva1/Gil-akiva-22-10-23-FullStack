import { Button, Stack } from '@mui/material';
import React from 'react';
import { FavoriteData } from '../pages/HomePage';
import { useParams } from 'react-router-dom';
import { Cards } from './Cards';

export const Favorites: React.FC = () => {
  const { key } = useParams();

  return <Stack direction={'column'}>{key && <Cards cityKey={key} city="d" />}</Stack>;
};
