import styled from "styled-components";

export interface StyledEmailProps {
  fontSize: string | undefined | null;
  backgroundColor?: string | undefined | null;
  placeholder: string;
  border?: string;
}

export const StyledEmail = styled.input<StyledEmailProps>`
  color: ${(props) => props.color || "gray"};
  font-size: ${(props) => props.fontSize || "16px"};
  padding: 10px;
  border-radius: 5px;
  border: ${(props) => props.border || "1px solid black"};
`;
