import React from "react";
import {Author, Authors} from "../store/types";

const updateAuthors = (currentAuthors: string[], authorId:string, formik:any) => {
    const newAuthors = currentAuthors?.includes(authorId)
        ? currentAuthors.filter((id) => id !== authorId)
        : currentAuthors && [...currentAuthors, authorId];

    if (formik.getFieldProps('authors').value.length === 0) {
        formik.setFieldValue('authors', newAuthors?.join(''));
    } else {
        formik.setFieldValue('authors', newAuthors?.join(', '));
    }
};

export const handleAuthor = (authorId:string, formik:any) => {
    const currentAuthors = formik.values.authors?.split(', ');
    updateAuthors(currentAuthors, authorId, formik);
};

export const transformAuthors = (authors: { [id: string]: Author; }): Set<string> => {
    const uniqueAuthors = new Set<string>();
    for (const author in authors) {
        uniqueAuthors.add(author.trim());
    }
    return uniqueAuthors;
};