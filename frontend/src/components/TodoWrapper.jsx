import { useEffect, useState } from "react";
import CreateForm from "./CreateForm";
import Todo from "./Todo";
import { addTodoApi, deleteTodoApi, editTodoApi, getAllTodoApi, toggleCompletedApi } from "../api/todoApi";
import { toast } from "sonner";

function TodoWrapper() {

    const [todos, setTodos] = useState([]);

    /* 將 API 回傳的 Todo 資料轉換成前端使用的格式，並加入 UI 狀態欄位 */
    const mapTodo = (todo) => {
        return {...todo, isEditing: false};
    };

    /* 取得多筆 Todo
        - response.ok : 狀態碼 200 - 299 之間
    */
    const getAllTodo = async () => {
        try {
            const response = await getAllTodoApi();
            if(!response.ok) {  // 判斷狀態碼是否正確
                const error = await response.json();
                throw new Error(error.message);
            }

            const data = await response.json();
            setTodos(data.map((todo) => {
                return mapTodo(todo);
            }));
        } catch(error) {
            toast.error(error.message);
        }
    };

    /* 第一次載入頁面時要執行的動作 */
    useEffect(() => {
        getAllTodo();
    }, []);

    /* 新增 Todo
        - previousTodos : 取得目前 state 裡最新的 todos
    */
    const addTodo = async (content) => {
        try {
            const response = await addTodoApi(content);
            if(!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            const todo = await response.json();
            setTodos(previousTodos => [...previousTodos, mapTodo(todo)]);
        } catch(error) {
            toast.error(error.message);
        }
    };

    /* 刪除 Todo
        - filter() : 依據指定條件過濾元素，回傳一個通過檢測的新陣列
            - true : 資料被保留
            - false : 資料被刪除
    */
    const deleteTodo = async (id) => {
        try {
            const response = await deleteTodoApi(id);
            if(!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            setTodos(previousTodos => previousTodos.filter((todo) => {
                return (todo.id !== id);
            }));
        } catch(error) {
            toast.error(error.message);
        }
    };

    /* 切換 Todo 的編輯狀態
        - 非編輯狀態(false) -> 編輯狀態(true)
    */
    const toggleEditing = (id) => {
        setTodos(previousTodos => previousTodos.map((todo) => {
            if(todo.id === id) {
                return {...todo, isEditing: true};
            } else {
                return todo;
            }
        }));
    };
    /* 編輯 Todo */
    const editTodo = async (id, newContent) => {
        try {
            const response = await editTodoApi(id, newContent);
            if(!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            const updateTodo = await response.json();
            setTodos(previousTodos => previousTodos.map((todo) => {
                if(todo.id === id) {
                    return mapTodo(updateTodo);
                } else {
                    return todo;
                }
            }));
        } catch(error) {
            toast.error(error.message);
        }
    };

    /* Todo 已完成 / 未完成狀態切換
        - 未完成(false) <-> 已完成(true)
    */
    const toggleCompleted = async (id) => {
        try {
            const response = await toggleCompletedApi(id);
            if(!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            const updateTodo = await response.json();
            setTodos(previousTodos => previousTodos.map((todo) => {
                if(todo.id === id) {
                    return mapTodo(updateTodo);
                } else {
                    return todo;
                }
            }));
        } catch(error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="wrapper">
            <h1>待辦事項</h1>
            <CreateForm addTodo={addTodo} />
            {todos.map((todo) => {  // map() : 遍歷原陣列的每個元素，透過指定的函式進行處理，回傳一個處理好的新陣列
                return <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleEditing={toggleEditing} editTodo={editTodo} toggleCompleted={toggleCompleted} />
            })}
        </div>
    );
}

// 導出元件
export default TodoWrapper