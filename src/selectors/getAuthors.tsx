import {AppRootState} from "../store/store";

export const getAuthors = (state: AppRootState) => state.authors.authors;