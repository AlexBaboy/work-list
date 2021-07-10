import styled from "styled-components"

export interface StyledLanSwitchProps {
    fontSize? : string,
    textDecoration? : string
}

export const StyledButtonSwitch = styled.span<StyledLanSwitchProps>`
  font-size: ${(props) => props.fontSize || "16px"};
  text-decoration: ${(props) => props.textDecoration || "none"};
  color: ${(props) => props.color || "gray"};
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  &.active-lan {
    font-weight: bold;
    text-decoration: underline;
  }
  & a {
    text-decoration: none;
    color: gray;
  }
`
