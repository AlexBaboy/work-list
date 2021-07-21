import styled from 'styled-components'

export interface StyledTitleProps {
    fontSize?: string | undefined | null;
    backgroundColor?: string | undefined | null;
    border?: string
};

export const StyledTitle = styled.div<StyledTitleProps>`
    display: flex;
    padding-top: 2rem;
    justify-content: center;
`;
