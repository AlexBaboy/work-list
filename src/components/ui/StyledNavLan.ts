import styled from "styled-components"

export interface StyledNavLanProps {
    color? : string,
    fontSize? : string,
    backgroundColor?: string | undefined | null
    textAlign? : string;
}

export const StyledNavLan = styled.div<StyledNavLanProps>`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  color: ${(props) => props.color || "gray"};
  font-size: ${(props) => props.fontSize || "16px"};  
  background-color: ${(props) => props.backgroundColor || "transparent"};  
  text-align: ${(props) => props.textAlign || "right"};
`
