import React from 'react';
import { StyledStartButton } from './styles/StyledStartButton';

const StartButton = ({ callback, text }) => (
  <StyledStartButton onClick={callback}>{text}</StyledStartButton>
)

export default StartButton;