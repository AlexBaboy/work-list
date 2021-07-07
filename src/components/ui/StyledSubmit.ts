import styled from 'styled-components'

export interface StyledSubmitProps {
    fontSize?: string | undefined,
    border?: string | undefined,
    color?: string | undefined
}

export const StyledSubmit = styled.button<StyledSubmitProps>`
  font-size: ${(props) => props.fontSize || "20px"};
  border: ${(props) => props.fontSize || "1px solid black"};
  padding: 1rem;
  cursor: pointer;
`