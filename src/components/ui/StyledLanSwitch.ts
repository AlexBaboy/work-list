import styled from "styled-components"

export interface StyledLanSwitchProps {
    fontSize? : string,
    textDecoration? : string
}

export const StyledLanSwitch = styled.span<StyledLanSwitchProps>`
  font-size: ${(props) => props.fontSize || "16px"};
  text-decoration: ${(props) => props.textDecoration || "none"};
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  &.active-lan {
    font-weight: bold;
    text-decoration: underline;
  }
`
