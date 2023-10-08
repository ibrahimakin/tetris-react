import React from 'react';
import { TETROMINOS } from '../helper';
import styled from 'styled-components';

const StyledCell = styled.div`
    background-color: rgba(${props => props.color}, .8);
    border: ${props => (props.type === 0 ? '0px solid' : '4px solid')};
    border-bottom-color: rgba(${props => props.color}, .1);
    border-right-color: rgba(${props => props.color}, 1);
    border-left-color: rgba(${props => props.color}, .3);
    border-top-color: rgba(${props => props.color}, 1);
`;

const Cell = ({ type }) => <StyledCell type={type} color={TETROMINOS[type].color} />;

export default React.memo(Cell);