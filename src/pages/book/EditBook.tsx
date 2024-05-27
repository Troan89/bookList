import React from 'react';
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {editBook} from "../../store/booksSlice";
import {useNavigate, useParams} from "react-router-dom";
import {updateAuthor} from "../../store/authorSlice";
import {validationFormBook} from "../../utils/validation";
import {handleAuthor, transformAuthors} from "../../utils/authorAddUpdate";
import {getAuthors} from "../../selectors/getAuthors";
import {getDraftBook} from "../../selectors/getDraftBook";
import {FormBook} from "./formBook";

export const EditBook = () => {

    const dispatch = useAppDispatch()

    const {id} = useParams()

    const navigate = useNavigate()

    const draftBook = useAppSelector(state => getDraftBook(state, id ? id : ''))
    const authors = useAppSelector(getAuthors)

    const formik = useFormik({
        validationSchema: validationFormBook,
        initialValues: {
            title: draftBook?.title,
            year: draftBook?.year,
            authors: draftBook?.authorIds?.join(', ')
        },
        onSubmit: (values) => {
            const copyAuthorsArray = values.authors?.split(', ') ?? []
            let res: string[] = []
            let copyDraftBook = draftBook?.authorIds?.length ?? 0
            if (copyAuthorsArray.length > copyDraftBook) {
                res = copyAuthorsArray.filter(item => !draftBook?.authorIds?.includes(item))
            } else {
                res = draftBook?.authorIds?.filter(item => !copyAuthorsArray?.includes(item)) ?? []
            }

            const book = {title: values.title, year: values.year, id, authorIds: values.authors?.split(', ')}
            book && dispatch(editBook(book))
            for (let i = 0; i < res.length; i++) {
                const author = {oldName: '', name: res[i], idBook: id}
                dispatch(updateAuthor(author))
            }

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

