export type Book = {
    id: string | undefined
    title: string | undefined
    authorIds: string[] | undefined
    year: string | undefined
}

export type Books = {
    books: Book[]
}

export type Author = {
    id?: string;
    name: string;
    idBook: string[];
}

export type Authors = {
    authors: { [id: string]: Author }
}

export type UpdateAuthorBook = {
    nameAuthorOld: string,
    nameAuthor: string
}

export type DeleteAuthorBook = {
    nameAuthor: string
}

export type AddAuthor = Omit<Author, 'idBook'> & { idBook: string }
export type UpdateAuthor = Omit<Author, 'idBook' | 'id'> & { idBook: string | undefined, oldName: string }
export type DeleteAuthor = {
    name: string[],
    idBook?: string
}