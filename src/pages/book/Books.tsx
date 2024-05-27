import React, {ChangeEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import styled from "styled-components";
import {deleteBook} from "../../store/booksSlice";
import {Book} from "../../store/types";
import {log} from "node:util";
import {deleteAuthor} from "../../store/authorSlice";

export const Books = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const books = useAppSelector(state => state.books.books)
    const [selectedAuthor, setSelectedAuthor] = useState<string>('')
    const [filteredList, setFilteredList] = useState<Book[]>([]);

    const handlerAddBook = () => {
        navigate('/addBook')
    }

    const handlerDeleteBook = (id: string, nameAuthors: string[]) => {
        dispatch(deleteBook(id))
        dispatch(deleteAuthor({name:nameAuthors, idBook: id}))
    }

    const handlerEditBook = (id: string) => {
        navigate(`/editBook/${id}`)
    }



    let sortArrayBook = [...books]
        .sort((a, b) => {
        if (a.title && b.title) {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }

        }
        return 0;
    })

    const handleAuthorChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedAuthor(event.currentTarget.value);

    }

    const handlerFilterAuthor = () => {
        let filteredAuthors = sortArrayBook.filter((author)=>author.authorIds?.includes(selectedAuthor) )
        setFilteredList(filteredAuthors);

    }

    let arrayBook = filteredList.length > 0 ? filteredList : sortArrayBook
    let arraySelect: string[] = []
        books.forEach((book)=>{
            book.authorIds?.forEach((author)=>{
                if (arraySelect.indexOf(author) === -1) {
                    arraySelect.push(author)
                }

            })
        })

    return (
        <div>
            <MenuTable>
                <button onClick={handlerAddBook}>Добавить книгу</button>
                <MenuFilter>
                    <select name="filterAuthor" id="" onChange={handleAuthorChange}>
                        <option value="">Выберите автора</option>
                        {arraySelect.map((authors, index) => {
                                return (
                                    <option value={authors} key={index}>{authors}</option>
                                )
                        })}
                    </select>
                    <button onClick={handlerFilterAuthor}>Применить</button>
                </MenuFilter>
            </MenuTable>


            <Table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Название</th>
                    <th>Год издания</th>
                    <th>Авторы</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {arrayBook.map((book) => {
                    return (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.year}</td>
                            <td>{book.authorIds?.join(', ')}</td>
                            <td>
                                <button onClick={() => book.id && handlerEditBook(book.id)}>
                                    Редактировать
                                </button>
                            </td>
                            <td>
                                <button onClick={() => {
                                    book.id && book.authorIds && handlerDeleteBook(book.id, book.authorIds)
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
const MenuTable = styled.div`
display: flex;
    justify-content: space-between;
    padding: 5px 20px;
    align-items: center;
`
const MenuFilter = styled.div`
display: flex;
    gap: 5px;
`
