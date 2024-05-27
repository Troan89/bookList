import React from 'react';
import styled from "styled-components";

type Props = {
    formik:any
}
export const FormAuthor = ({formik}:Props) => {
    return (
        <div>
            <AddBookForm onSubmit={formik.handleSubmit}>
                <label htmlFor="title">Имя автора:</label>
                <textarea {...formik.getFieldProps('title')} placeholder="Введите имя автора"/>
                {formik.errors.title && <div style={{color: 'red'}}>{formik.errors.title}</div>}

                <button type={"submit"}>сохранить</button>
            </AddBookForm>
        </div>
    );
};

const AddBookForm = styled.form`
    display: flex;
    flex-direction: column;
    width: auto;
    gap: 10px;
    align-items: flex-start;
`
