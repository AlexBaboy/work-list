import React, { Suspense } from "react";
import { StyledH2 } from "../components/ui/StyledH2";
import Container from "@material-ui/core/Container";
import { StyledP } from "../components/ui/StyledP";
import { useForm } from "react-hook-form";
import { StyledText } from "../components/ui/StyledText";
import { StyledForm } from "../components/ui/StyledForm";
import { StyledSubmit } from "../components/ui/StyledSubmit";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {loginRequest, setCurrentUrl} from "../store/worklist";
import {useDispatch} from "react-redux";

export const Login: React.FC = () => {

  const errorLoginText = 'поле ЛОГИН является обязательным'
  const errorPasswordText = 'поле ПАРОЛЬ является обязательным'

  const schema = yup.object({
    login: yup.string().required(errorLoginText),
    password: yup.string().required(errorPasswordText)
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = async (data: any) => {
    const form = new FormData();
    form.append("login", data.login);
    form.append("password", data.password);

    try {
      const resultAction = await dispatch(loginRequest( form ))

      console.log("resultAction", resultAction)
    } catch (rejectedValueOrSerializedError) {
      // handle error here
    }
  };

  React.useEffect(() => {
    dispatch(setCurrentUrl('/login'))
  },[])

  return (
    <Suspense fallback={"loading"}>
      <Container maxWidth="md">
        <StyledH2>Введите данные для входа</StyledH2>

        <div>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>

            <StyledP>Логин</StyledP>
            <StyledText
              border={errors.login ? "2px solid red" : ""}
              color={"black"}
              fontSize={"16px"}
              type="text"
              placeholder="введите логин"
              {...register("login")}
            />
            {errors.login && (
              <i>
                <b>{errorLoginText}</b>
              </i>
            )}

            <StyledP>Пароль</StyledP>
            <StyledText
                border={errors.password ? "2px solid red" : ""}
                color={"black"}
                fontSize={"16px"}
                type="password"
                placeholder="введите пароль"
                {...register("password")}
            />
            {errors.password && (
                <i>
                  <b>{errorPasswordText}</b>
                </i>
            )}

            <StyledSubmit
              type="submit"
              disabled={!isValid || Object.keys(errors).length > 0}
            >
              Авторизация
            </StyledSubmit>
          </StyledForm>
        </div>
      </Container>
    </Suspense>
  );
};
