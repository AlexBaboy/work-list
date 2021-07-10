import styled from "styled-components"

export interface StyledNavButtons {
    color? : string,
    fontSize? : string,
    backgroundColor?: string | undefined | null
    textAlign? : string;
}

export const StyledNavButtons = styled.div<StyledNavButtons>`
  display: flex;
  gap: 1rem;
  color: ${(props) => props.color || "gray"};
  font-size: ${(props) => props.fontSize || "16px"};  
  background-color: ${(props) => props.backgroundColor || "transparent"};  
`
