import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Book, Books, DeleteAuthorBook, UpdateAuthorBook} from "./types";

const initialState: Books = {
    books: []
}

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook(state, action: PayloadAction<Book>) {
            state.books.push(action.payload);
        },
        deleteBook(state, action: PayloadAction<string>) {
            state.books = state.books.filter(book => book.id !== action.payload)
        },
        editBook(state, action: PayloadAction<Book>) {
            const index = state.books.findIndex(book => book.id === action.payload.id);
            if (index !== -1) {
                state.books[index] = {...state.books[index], ...action.payload};
            }
        },
        updateAuthorBook(state, action: PayloadAction<UpdateAuthorBook>) {
            const {nameAuthorOld, nameAuthor} = action.payload
            for (let i = 0; i < state.books.length; i++) {
                if (state.books[i]) {
                    const index = state.books[i].authorIds?.indexOf(nameAuthorOld);
                    if (index !== -1) {
                        // @ts-ignore
                        state.books[i].authorIds[index] = nameAuthor;
                    }
                }
            }
        },
        deleteAuthorBook(state, action: PayloadAction<DeleteAuthorBook>) {
            const {nameAuthor} = action.payload
            for (let i = 0; i < state.books.length; i++) {
                if (state.books[i].authorIds?.indexOf(nameAuthor) !== -1) {
                    state.books[i].authorIds = state.books[i].authorIds?.filter((author) => author !== nameAuthor);
                }
            }
        }
    }
})

export const {
    addBook,
    deleteBook,
    editBook,
    updateAuthorBook,
    deleteAuthorBook
} = booksSlice.actions
export const booksReducer = booksSlice.reducer