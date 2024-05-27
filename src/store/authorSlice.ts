import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AddAuthor, Authors, DeleteAuthor, UpdateAuthor} from "./types";

const initialState: Authors = {
    authors: {}
}

export const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {
        addAuthor(state, action: PayloadAction<AddAuthor>) {
            const {id, name, idBook} = action.payload;
            if (idBook === '') {
                state.authors[name] = {id, name, idBook: []}
            } else {
                if (!state.authors[name]) {
                    state.authors[name] = {id, name, idBook: [idBook]}
                } else if (state.authors[name]) {
                    state.authors[name].idBook = state.authors[name].idBook.filter((bookId) => bookId !== idBook)
                } else {
                    if (idBook.length !== 0) {
                        state.authors[name].idBook.push(idBook)
                    }
                }
            }
        },
        updateAuthor(state, action: PayloadAction<UpdateAuthor>) {
            const {oldName, name, idBook} = action.payload
            if (idBook) {
                if (state.authors[name].idBook.includes(idBook)) {
                    state.authors[name].idBook = state.authors[name].idBook.filter((bookId) => bookId !== idBook)

                } else {
                    state.authors[name].idBook.push(idBook)

                }

                state.authors[name].idBook = Array.from(new Set(state.authors[name].idBook))
            } else {
                state.authors[name] = state.authors[oldName]
                state.authors[name].name = name
                delete state.authors[oldName]
            }
        },
        deleteAuthor(state, action: PayloadAction<DeleteAuthor>) {
            for (let i = 0; i < action.payload.name.length; i++) {
                if (state.authors[action.payload.name[i]].idBook.length === 1) {
                    delete state.authors[action.payload.name[i]]
                } else {
                    state.authors[action.payload.name[i]].idBook = state.authors[action.payload.name[i]].idBook.filter((id) => id !== action.payload.idBook)
                }

            }

        }
    }
})

export const {addAuthor, updateAuthor, deleteAuthor} = authorsSlice.actions
export const authorsReducer = authorsSlice.reducer