import React from 'react';
import {useFormik} from "formik";
import {useAppDispatch} from "../../store/store";
import {v1} from "uuid";
import {useNavigate} from "react-router-dom";
import {addAuthor} from "../../store/authorSlice";
import {validationFormAuthor} from "../../utils/validation";
import {FormAuthor} from "./formAuthor";

export const FormAddAuthor = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const formik = useFormik({
        validationSchema: validationFormAuthor,
        initialValues: {
            title: '',
        },
        onSubmit: (values) => {
            const idAuthor = v1()
            const author = {id: idAuthor, name: values.title, idBook: ''}
            dispatch(addAuthor(author))

            navigate('/authors')
        }
    })

    return (
        <FormAuthor formik={formik} />
    );
};

