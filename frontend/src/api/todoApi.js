import { apiFetch } from "./client";

/* 取得多筆 Todo */
export const getAllTodoApi = () => {
    return apiFetch("/todo");
};
