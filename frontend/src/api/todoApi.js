import { apiFetch } from "./client";

/* 取得多筆 Todo */
export const getAllTodoApi = () => {
    return apiFetch("/todo");
};

/* 新增 Todo
    - headers : 告訴後端 Request Body 的資料格式
    - .stringify() : 將傳給後端的資料轉成字串
*/
export const addTodoApi = (content) => {
    return apiFetch("/todo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: content
        })
    });
};

/* 刪除 Todo */
export const deleteTodoApi = (id) => {
    return apiFetch(`/todo/${id}`, {
        method: "DELETE"
    });
};

/* 編輯 Todo */
export const editTodoApi = (id, content) => {
    return apiFetch(`/todo/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: content
        })
    });
};
