import React from 'react';
import {useFormik} from "formik";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {addBook} from "../../store/booksSlice";
import {v1} from "uuid";
import {useNavigate} from "react-router-dom";
import {updateAuthor} from "../../store/authorSlice";
import {validationFormBook} from "../../utils/validation";
import {handleAuthor, transformAuthors} from "../../utils/authorAddUpdate";
import {getAuthors} from "../../selectors/getAuthors";
import {FormBook} from "./formBook";

export const AddBook = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const authors = useAppSelector(getAuthors)

    const formik = useFormik({
        validationSchema: validationFormBook,
        initialValues: {
            title: '',
            year: '',
            authors: ''
        },
        onSubmit: (values) => {
            const copyAuthorsArray = values.authors.split(', ')
            const idBook = v1()
            const book = {title: values.title, year: values.year, id: idBook, authorIds: copyAuthorsArray}
            for (let i = 0; i < copyAuthorsArray.length; i++) {
                const author = {oldName: '' ,name: copyAuthorsArray[i], idBook: idBook}
                dispatch(updateAuthor(author))
            }

            dispatch(addBook(book))
            navigate('/books')
        }
    })

    const handleAuthorToggle = (authorId: string) => {
        handleAuthor(authorId, formik);
    };

    let b: Set<string> = transformAuthors(authors);

    return (
        <FormBook b={b} formik={formik} handleAuthorToggle={handleAuthorToggle}/>
    );
};

