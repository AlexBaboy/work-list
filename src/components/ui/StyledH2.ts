import styled from "styled-components";

export interface H2Props {
    color?: string | undefined | null,
    fontSize?: string | undefined | null;
    backgroundColor?: string | undefined | null;
};

export const StyledH2 = styled.h2<H2Props>`
  color: ${(props) => props.color || "gray"};
`;

export const StyledH2Error = styled(StyledH2)`
  font-size: 36px;
`;
