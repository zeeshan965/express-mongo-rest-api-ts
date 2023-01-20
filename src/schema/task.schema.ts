import {object, string} from "yup";

export const createTaskSchema = object({
    body: object({
        name: string().required("Name is required"),
    }),
});