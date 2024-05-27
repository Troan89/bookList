import {AppRootState} from "../store/store";

export const getDraftBook = (state: AppRootState, id: string) => state.books.books.find(book => book.id === id);