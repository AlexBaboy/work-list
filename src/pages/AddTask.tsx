import React, { Suspense } from "react";
import { StyledH2 } from "../components/ui/StyledH2";
import Container from "@material-ui/core/Container";
import { StyledP } from "../components/ui/StyledP";
import { useForm } from "react-hook-form";
import { StyledText } from "../components/ui/StyledText";
import { StyledForm } from "../components/ui/StyledForm";
import { StyledSubmit } from "../components/ui/StyledSubmit";
import { StyledEmail } from "../components/ui/StyledEmail";
import { StyledTextarea } from "../components/ui/StyledTextarea";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {addTaskRequest, changeRequest, setCurrentUrl} from "../store/worklist";
import {useDispatch} from "react-redux";

export const AddTask: React.FC = () => {

    const errorName = 'поле ИМЯ является обязательным'
    const errorEmail = 'поле EMAIL некорректно'
    const errorText = 'поле ТЕКСТ является обязательным'

    const schema = yup.object({
        username: yup.string().required(errorName),
        email: yup.string().required(errorEmail).email(),
        text: yup.string().required(errorText)
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
        form.append("username", data.username);
        form.append("email", data.email);
        form.append("text", data.text);
        //return dispatch(addTaskRequest( form ))
        const resultAction = await dispatch(addTaskRequest( form ))

        console.log("resultAction", resultAction)

        if (addTaskRequest.fulfilled.match(resultAction)) {

        } else {
            if (resultAction.payload) {
                // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, those types will be available here.
                //formikHelpers.setErrors(resultAction.payload.field_errors)
            } else {
                //showToast('error', `Update failed: ${resultAction.error}`)
            }
        }
    };

    React.useEffect(() => {
        dispatch(setCurrentUrl('/addTask'))
    },[])

    return (
        <Suspense fallback={"loading"}>
            <Container maxWidth="md">
                <div>
                    <StyledForm onSubmit={handleSubmit(onSubmit)}>

                        <StyledP>Имя пользователя</StyledP>
                        <StyledText
                            border={errors.username ? "2px solid red" : ""}
                            color={"black"}
                            fontSize={"16px"}
                            type="text"
                            placeholder="введите имя пользователя"
                            {...register("username")}
                        />
                        {errors.username && (
                            <i>
                                <b>{errorName}</b>
                            </i>
                        )}

                        <StyledP>Email</StyledP>
                        <StyledEmail
                            border={errors.email ? "2px solid red" : ""}
                            color={"black"}
                            fontSize={"16px"}
                            type="text"
                            placeholder="введите email"
                            {...register("email")}
                        />
                        {errors.email && (
                            <i>
                                <b>{errorEmail}</b>
                            </i>
                        )}

                        <StyledP>Задача</StyledP>
                        <StyledTextarea
                            border={errors.text ? "2px solid red" : ""}
                            color={"black"}
                            fontSize={"16px"}
                            placeholder="введите задачу"
                            {...register("text")}
                        />
                        {errors.text && (
                            <i>
                                <b>{errorText}</b>
                            </i>
                        )}

                        <StyledSubmit
                            type="submit"
                            disabled={!isValid || Object.keys(errors).length > 0}
                        >
                            Добавить
                        </StyledSubmit>
                    </StyledForm>
                </div>
            </Container>
        </Suspense>
    );
};
