import React from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import styled from "styled-components";
import {deleteAuthorBook, deleteBook, editBook} from "../../store/booksSlice";
import {Author} from "../../store/types";
import {log} from "node:util";
import {deleteAuthor} from "../../store/authorSlice";

export const Authors = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const authors = useAppSelector(state=> state.authors.authors)


    const handlerAddBook = () => {
        navigate('/addAuthor')
    }

    const handlerDeleteAuthor = (name:string) => {
        dispatch(deleteAuthor({name:[name]}))
        dispatch(deleteAuthorBook({nameAuthor:name}))
    }

    const handlerEditAuthor = (id:string) => {
        navigate(`/editAuthor/${id}`)
    }

    let arrayAuthors = Object
        .entries(authors)
        .sort(([keyA, authorA],[keyB, authorB])=>{
            if (authorA.name < authorB.name) {
                return -1;
            }
            if (authorA.name > authorB.name) {
                return 1;
            }
            return 0;
        })


    return (
        <div>
            <button onClick={handlerAddBook}>Добавить автора</button>
            <Table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>ФИО</th>
                    <th>Количество книг</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {arrayAuthors?.map((author) => {
                    let id = author[1].id
                    return (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{author[1].name}</td>
                            <td>{author[1].idBook.length}</td>
                            <td>
                                <button onClick={()=>handlerEditAuthor(author[0])}>
                                    Редактировать
                                </button>
                            </td>
                            <td>
                                <button onClick={() => {
                                    handlerDeleteAuthor(author[0])
                                }}>
                                    x
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>

        </div>
    );
};

const Table = styled.table`
    border-collapse: collapse;
    width: 100%;

    th, td {
        border: 1px solid #ccc;
        padding: 8px;
    }
`

