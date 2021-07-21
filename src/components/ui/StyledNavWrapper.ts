import styled from "styled-components";

export interface NavWrapper {
    color?: string,
    fontSize?: string,
    backgroundColor?: string | undefined | null
}

export const StyledNavWrapper = styled.div<NavWrapper>`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 2rem;
  color: ${(props) => props.color || "gray"};
  font-size: ${(props) => props.fontSize || "16px"};
  background-color: ${(props) => props.backgroundColor || "transparent"};
`
