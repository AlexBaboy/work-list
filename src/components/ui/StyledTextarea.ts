import styled from 'styled-components'

export interface StyledTextareaProps {
    color?: string | undefined | null,
    fontSize?: string | undefined | null;
    backgroundColor?: string | undefined | null;
    border?: string
};

export const StyledTextarea = styled.textarea<StyledTextareaProps>`
  color: ${(props) => props.color || "gray"};
  font-size: ${(props) => props.fontSize || "16px"}; 
  padding: 10px;
  border-radius: 5px;
  border: ${(props) => props.border || "1px solid black"};
`;