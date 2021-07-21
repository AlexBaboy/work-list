import React, {Suspense, useState} from "react";

import Container from "@material-ui/core/Container";
import { StyledP } from "../components/ui/StyledP";
import { useForm } from "react-hook-form";

import { StyledForm } from "../components/ui/StyledForm";
import { StyledSubmit } from "../components/ui/StyledSubmit";

import { StyledTextarea } from "../components/ui/StyledTextarea";
import { StyledCheckbox } from "../components/ui/StyledCheckbox";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {editTaskRequest, setCurrentUrl} from "../store/worklist";

import {useAppDispatch} from "../store";
import {RouteComponentProps, useHistory} from "react-router";
import {useSelector} from "react-redux";
import {getCurrentTaskInitialById, getLoadingStatus} from "../store/selectors";
import {toast, ToastContainer} from "react-toastify";
import {IEditTaskParams} from "../interfaces/IEditTaskParams";
import {createStyles, makeStyles} from "@material-ui/core/styles";

export const EditTask: React.FC<RouteComponentProps<any>> = props => {

    const errorText = 'поле ТЕКСТ является обязательным'

    const currentTaskInitial = useSelector(getCurrentTaskInitialById(Number(props.match.params.id)))

    const schema = yup.object({
        text: yup.string().required(errorText)
    });

    const useStyles = makeStyles((theme) =>
        createStyles({
            statusWrap: {
                margin: 0,
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            },
            statusActiveElement: {
                cursor: 'pointer'
            }
        })
    );

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
    const history = useHistory();

    const [disabled, setDisabled] = useState(false)

    const onSubmit = async (data: any) => {

        if(!token) {

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

        // задача отредактирована админом и выполнена
        if(currentTaskInitial?.text !==  data.text && data.status) {
            data.status = 11
        }
        // задача не выполнена, отредактирована админом
        else if(currentTaskInitial?.text !==  data.text && !data.status) {
            data.status = 1
        }
        // задача выполнена
        else if(currentTaskInitial?.text ===  data.text && data.status) {
            data.status = 10
        }
        // задача не выполнена
        else
            data.status = 0

        const form = new FormData();

        form.append("text", data.text);
        form.append("status", data.status);
        form.append("token", token);

        try {

            const editedTaskParams = {} as IEditTaskParams;
            editedTaskParams.id =  props.match.params.id
            editedTaskParams.data =  form

            const resultAction = await dispatch(editTaskRequest( editedTaskParams ))

            setDisabled(true)
            toast.info("Изменения успешно сохранены!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })

            setTimeout(()=> {
                history.push('/')
            },3000)

        } catch (rejectedValueOrSerializedError) {
            // handle error here
        }

    };

    React.useEffect(() => {
        dispatch(setCurrentUrl(`${props.match.url}`))
    },[])

    const classes = useStyles();

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
                            disabled={disabled}
                        />

                        {errors.text && (
                            <i>
                                <b>{errorText}</b>
                            </i>
                        )}

                        <StyledP>Статус</StyledP>
                        <div className={classes.statusWrap}>
                            <StyledCheckbox
                                className={classes.statusActiveElement}
                                border={errors.status ? "2px solid red" : ""}
                                color={"black"}
                                defaultChecked={currentTaskInitial?.status === 10 || currentTaskInitial?.status === 11}
                                id='status-id'
                                {...register("status")}
                                disabled={disabled}
                            />
                            <label
                                htmlFor='status-id'
                                className={classes.statusActiveElement}
                            >Выполнена</label>
                        </div>

                        <StyledSubmit
                            type="submit"
                            disabled={!isValid || Object.keys(errors).length > 0 || disabled}
                        >
                            редактировать
                        </StyledSubmit>

                        <ToastContainer />

                    </StyledForm>
                </div>
            </Container>
        </Suspense>
    );
};
