import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
`;

export const StyledTetris = styled.div`
    display: flex;
    align-items: flex-start;
    padding-top: 35px;
    margin: auto;
    max-width: 850px;
    aside {
        min-width: 0;
        display: block;
        margin-left: 20px;
    }
`;
