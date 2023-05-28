import styled from 'styled-components';

export const StyledStage = styled.div`
    display: grid;
    grid-template-rows: repeat(${props => props.height}, 1fr);
    grid-template-columns: repeat(${props => props.width}, 1fr);
    border: 4px solid #333;
    background-color: #111;
    grid-gap: 1px;
    min-height: 80vmin;
    min-width: 48vmin;
`;