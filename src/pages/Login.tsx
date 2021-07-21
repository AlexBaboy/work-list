import React, {Suspense, useState} from "react";
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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useAppDispatch} from "../store";
import {useHistory} from "react-router";

export const Login: React.FC = () => {

  const errorLoginText = 'поле ЛОГИН является обязательным'
  const errorPasswordText = 'поле ПАРОЛЬ является обязательным'

  const schema = yup.object({
    username : yup.string().required(errorLoginText),
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

  const dispatch = useAppDispatch();
  const history = useHistory();

  const [disabled, setDisabled] = useState(false)

  const onSubmit = async (data: any) => {
    const form = new FormData();
    form.append("username", data.username);
    form.append("password", data.password);

    try {
      const resultAction = await dispatch(loginRequest( form ))

      if( resultAction.payload.status === 'error' ) {
        toast.error(resultAction.payload.message.username ? resultAction.payload.message.username : resultAction.payload.message.password, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })

      } else {

        setDisabled(true)

        if( resultAction.payload.message ) {

          toast.info("Авторизация прошла успешно!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })

          setTimeout(() => {
            history.push('/')
          }, 3000);

        }
      }

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
              border={errors.username  ? "2px solid red" : ""}
              color={"black"}
              fontSize={"16px"}
              type="text"
              placeholder="введите логин"
              {...register("username")}
                onChange={(e)=> console.log(isValid)}
              disabled={disabled}
            />
            {errors.username  && (
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
                onChange={(e)=> console.log(isValid)}
                disabled={disabled}
            />
            {errors.password && (
                <i>
                  <b>{errorPasswordText}</b>
                </i>
            )}

            <StyledSubmit
              type="submit"
              disabled={!isValid || Object.keys(errors).length > 0 || disabled}
            >
              Авторизация
            </StyledSubmit>

            <ToastContainer />

          </StyledForm>
        </div>
      </Container>
    </Suspense>
  );
};
