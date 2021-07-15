import styled from 'styled-components'

export interface StyledSelectProps {
    color?: string | undefined | null,
    fontSize?: string | undefined | null;
    backgroundColor?: string | undefined | null;
    border?: string
};

export const StyledSelect = styled.select<StyledSelectProps>`
  color: ${(props) => props.color || "gray"};
  font-size: ${(props) => props.fontSize || "16px"}; 
  padding: 10px;
  border-radius: 5px;
  border: ${(props) => props.border || "1px solid black"};
`;