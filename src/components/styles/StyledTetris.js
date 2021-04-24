import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export const StyledTetris = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 35px 0 0 35px;
  margin: 0 auto;
  max-width: 900px;
  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;
