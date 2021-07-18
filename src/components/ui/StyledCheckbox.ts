import styled from 'styled-components'

export interface StyledCheckboxProps {
    backgroundColor?: string | undefined | null;
    border?: string
};

export const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })<StyledCheckboxProps>`
  color: ${(props) => props.color || "gray"};
  padding: 10px;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  border: ${(props) => props.border || "1px solid black"};
`;
