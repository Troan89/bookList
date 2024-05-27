import * as Yup from "yup";

export const validationFormBook = Yup.object().shape({
    title: Yup.string()
        .min(3, 'small symbol')
        .required('Required'),
    year: Yup.date()
        .required()
        .max(new Date(), 'Дата не может быть больше текущей'),
    authors: Yup.string()
        .required()

})

export const validationFormAuthor = Yup.object().shape({
    title: Yup.string()
        .min(3, 'small symbol')
        .required('Required'),
})