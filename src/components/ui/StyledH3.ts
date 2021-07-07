import styled from "styled-components";

export interface H3Props {
    color?: string | undefined | null,
    fontSize?: string | undefined | null;
    backgroundColor?: string | undefined | null;
};

export const StyledH3 = styled.h3<H3Props>`
  color: ${(props) => props.color || "gray"};
`;

