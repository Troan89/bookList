import {AppRootState} from "../store/store";

export const getDraftAuthor = (state: AppRootState, name: string) => state.authors.authors[name ?? '']