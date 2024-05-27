import React from 'react';
import styled from "styled-components";

type Props = {
    formik:any
    handleAuthorToggle: (author:string)=>void
    b: Set<string>
}
export const FormBook = ({handleAuthorToggle, formik, b}:Props) => {
    return (
        <div>
            <AddBookForm onSubmit={formik.handleSubmit}>
                <label htmlFor="title">Название книги:</label>
                <textarea {...formik.getFieldProps('title')}/>
                {formik.errors.title && <div style={{color: 'red'}}>{formik.errors.title}</div>}
                <label htmlFor="year">Год издания:</label>
                <input type={"date"} {...formik.getFieldProps('year')}/>
                {formik.errors.year && <div style={{color: 'red'}}>{formik.errors.year}</div>}
                <label htmlFor="authors">Авторы (выберите нужные):</label>
                {Array.from(b).map((author) => {
                    return (
                        <CheckboxWrapper key={author}>
                            <input
                                type="checkbox"
                                id={`author-${author}`}
                                onChange={() => handleAuthorToggle(author)}
                                checked={formik.values.authors?.includes(author)}
                            />
                            <label htmlFor={`author-${author}`}>{author}</label>
                        </CheckboxWrapper>
                    )
                })
                }
                {formik.errors.authors && <div style={{color: 'red'}}>{formik.errors.authors}</div>}
                <button type={"submit"}>Сохранить</button>
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

export const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
`;
