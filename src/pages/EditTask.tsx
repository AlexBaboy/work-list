import React, { Suspense } from "react";

import Container from "@material-ui/core/Container";
import { StyledP } from "../components/ui/StyledP";
import { useForm } from "react-hook-form";

import { StyledForm } from "../components/ui/StyledForm";
import { StyledSubmit } from "../components/ui/StyledSubmit";

import { StyledTextarea } from "../components/ui/StyledTextarea";
import { StyledSelect } from "../components/ui/StyledSelect";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {editTaskRequest, setCurrentUrl} from "../store/worklist";

import {useAppDispatch} from "../store";
import {RouteComponentProps} from "react-router";
import {useSelector} from "react-redux";
import {getCurrentTaskInitialById} from "../components/Selectors";
import {toast} from "react-toastify";
import {EditTaskParams} from "../interfaces/EditTaskParams";

export const EditTask: React.FC<RouteComponentProps<any>> = props => {

    const errorText = 'поле ТЕКСТ является обязательным'
    const errorStatus = 'поле СТАТУС является обязательным'

    const currentTaskInitial = useSelector(getCurrentTaskInitialById(Number(props.match.params.id)))
    console.log("currentTaskInitial", currentTaskInitial)

    const schema = yup.object({
        text: yup.string().required(errorText),
        status: yup.string().required(errorStatus)
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

    const dispatch = useAppDispatch()
    const token = localStorage.getItem('token')

    const onSubmit = async (data: any) => {
        console.log("submit edit")
        console.log("50 token = " + token)
        if(!token) {
            console.log("52")
            toast.error("Нет доступа к редактированию записи!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })
            return false
        }

        const form = new FormData();
        form.append("id", props.match.params.id);
        form.append("text", data.text);
        form.append("status", data.status);
        form.append("token", token);

        try {

            const editedTaskParams = {} as EditTaskParams;
            editedTaskParams.id =  props.match.params.id
            editedTaskParams.data =  form

            const resultAction = await dispatch(editTaskRequest( editedTaskParams ))
            console.log("resultAction", resultAction)

        } catch (rejectedValueOrSerializedError) {
            // handle error here
        }

    };

    React.useEffect(() => {
        console.log("props = ", props)
        dispatch(setCurrentUrl(`${props.match.url}`))
    },[])

    return (
        <Suspense fallback={"loading"}>
            <Container maxWidth="md">
                <div>
                    <StyledForm onSubmit={handleSubmit(onSubmit)}>

                        <StyledP>Задача</StyledP>
                        <StyledTextarea
                            border={errors.text ? "2px solid red" : ""}
                            color={"black"}
                            fontSize={"16px"}
                            placeholder="введите задачу"
                            {...register("text")}
                            defaultValue={currentTaskInitial?.text}
                        />

                        {errors.text && (
                            <i>
                                <b>{errorText}</b>
                            </i>
                        )}

                        <StyledP>Статус</StyledP>
                        <StyledSelect
                            border={errors.status ? "2px solid red" : ""}
                            color={"black"}
                            fontSize={"16px"}
                            placeholder="укажите статус"
                            {...register("status")}
                            defaultValue={currentTaskInitial?.status.toString()}
                        >

                            <option value='undefined'>выбрать...</option>
                            <option value='0'>задача не выполнена</option>
                            <option value='1'>задача не выполнена, отредактирована админом</option>
                            <option value='10'>задача выполнена</option>
                            <option value='11'>задача отредактирована админом и выполнена</option>
                        </StyledSelect>

                        {errors.status && (
                            <i>
                                <b>{errorStatus}</b>
                            </i>
                        )}

                        <StyledSubmit
                            type="submit"
                            disabled={!isValid || Object.keys(errors).length > 0}
                        >
                            редактировать
                        </StyledSubmit>
                    </StyledForm>
                </div>
            </Container>
        </Suspense>
    );
};
