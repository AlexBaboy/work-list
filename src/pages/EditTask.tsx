import React, { Suspense } from "react";

import Container from "@material-ui/core/Container";
import { StyledP } from "../components/ui/StyledP";
import { useForm } from "react-hook-form";

import { StyledForm } from "../components/ui/StyledForm";
import { StyledSubmit } from "../components/ui/StyledSubmit";

import { StyledTextarea } from "../components/ui/StyledTextarea";
import { StyledSelect } from "../components/ui/StyledSelect";
import { StyledCheckbox } from "../components/ui/StyledCheckbox";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {editTaskRequest, setCurrentUrl} from "../store/worklist";

import {useAppDispatch} from "../store";
import {RouteComponentProps, useHistory} from "react-router";
import {useSelector} from "react-redux";
import {getCurrentTaskInitialById} from "../components/Selectors";
import {toast} from "react-toastify";
import {EditTaskParams} from "../interfaces/EditTaskParams";
import {createStyles, makeStyles} from "@material-ui/core/styles";

export const EditTask: React.FC<RouteComponentProps<any>> = props => {

    const errorText = 'поле ТЕКСТ является обязательным'

    const currentTaskInitial = useSelector(getCurrentTaskInitialById(Number(props.match.params.id)))
    console.log("currentTaskInitial", currentTaskInitial)

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

    const onSubmit = async (data: any) => {
        console.log("submit edit")
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
        form.append("id", props.match.params.id);
        form.append("text", data.text);
        form.append("status", data.status);
        form.append("token", token);
        console.log("89 data", data)
        try {

            const editedTaskParams = {} as EditTaskParams;
            editedTaskParams.id =  props.match.params.id
            editedTaskParams.data =  form

            const resultAction = await dispatch(editTaskRequest( editedTaskParams ))
            console.log("resultAction", resultAction)

            toast.info("Изменения успешно сохранены!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })

        } catch (rejectedValueOrSerializedError) {
            // handle error here
        }

    };

    React.useEffect(() => {
        console.log("props = ", props)
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
                            />
                            <label
                                htmlFor='status-id'
                                className={classes.statusActiveElement}
                            >Выполнена</label>
                        </div>

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
