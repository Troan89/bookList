import React from 'react';
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {useNavigate, useParams} from "react-router-dom";
import {updateAuthor} from "../../store/authorSlice";
import {updateAuthorBook} from "../../store/booksSlice";
import {getDraftAuthor} from "../../selectors/getDraftAuthor";
import {validationFormAuthor} from "../../utils/validation";
import {FormAuthor} from "./formAuthor";

export const FormEditAuthor = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {name} = useParams()

    const draftAuthor = useAppSelector(state => getDraftAuthor(state, name ? name : ''))

    const formik = useFormik({
        validationSchema: validationFormAuthor,
        initialValues: {
            title: draftAuthor.name,
        },
        onSubmit: (values) => {
            const author = {oldName: draftAuthor.name, name: values.title, idBook: ''}
            const book = {nameAuthorOld: draftAuthor.name, nameAuthor: values.title}
            dispatch(updateAuthor(author))
            dispatch(updateAuthorBook(book))

            navigate('/authors')
        }
    })

    return (
        <FormAuthor formik={formik} />
    );
};
