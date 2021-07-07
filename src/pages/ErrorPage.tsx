import React from "react";
import Container from "@material-ui/core/Container";
import { StyledH2Error } from "../components/ui/StyledH2";

export const ErrorPage: React.FC = () => {


    return (
    <Container maxWidth="md">
      <StyledH2Error color={"red"} fontSize={"36px"}>Такой страницы не существует</StyledH2Error>
    </Container>
  );
};
