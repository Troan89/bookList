import App from "../App";
import {createBrowserRouter} from "react-router-dom";
import {Error404} from "../pages/error";
import {AddBook} from "../pages/book/AddBook";
import {Books} from "../pages/book/Books";
import {EditBook} from "../pages/book/EditBook";
import {Authors} from "../pages/author/Authors";
import {FormAddAuthor} from "../pages/author/formAddAuthor";
import {FormEditAuthor} from "../pages/author/formEditAuthor";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <Error404/>,

        children: [
            {
                path:'/books',
                element: <Books/>
            },
            {
                path:'/authors',
                element: <Authors/>
            },
            {
                path: '/addBook',
                element: <AddBook/>
            },
            {
                path: '/addAuthor',
                element: <FormAddAuthor/>
            },
            {
                path: '/editBook/:id?',
                element: <EditBook />
            },
            {
                path: '/editAuthor/:name?',
                element: <FormEditAuthor />
            }
        ],
    },
]);