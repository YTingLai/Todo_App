import { useEffect, useState } from "react";
import CreateForm from "./CreateForm";
import Todo from "./Todo";
import { addTodoApi, getAllTodoApi } from "../api/todoApi";

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
                throw new Error(response.status);
            }

            const data = await response.json();
            setTodos(data.map((todo) => {
                return mapTodo(todo);
            }));
        } catch(error) {
            console.error(error);
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
                throw new Error(response.status);
            }

            const todo = await response.json();
            setTodos(previousTodos => [...previousTodos, mapTodo(todo)]);
        } catch(error) {
            console.error(error);
        }
    };

    /* 刪除 todo
        - filter() : 依據指定條件過濾元素，回傳一個通過檢測的新陣列
            - true : 資料被保留
            - false : 資料被刪除
    */
    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => {
            return (todo.id !== id);
        }));
    };

    /* 切換 todo 的編輯狀態
        - 非編輯狀態(false) -> 編輯狀態(true)
    */
    const toggleEditing = (id) => {
        setTodos(todos.map((todo) => {
            if(todo.id === id) {
                return {...todo, isEditing: true};
            } else {
                return todo;
            }
        }));
    };
    /* 編輯 todo */
    const editTodo = (id, newContent) => {
        setTodos(todos.map((todo) => {
            if(todo.id === id) {
                return {...todo, content: newContent, isEditing: false};
            } else {
                return todo;
            }
        }));
    };

    /* 切換 todo 的完成狀態
        - 未完成(false) <-> 已完成(true)
    */
    const toggleCompleted = (id) => {
        setTodos(todos.map((todo) => {
            if(todo.id === id) {
                return {...todo, isCompleted: !todo.isCompleted};
            } else {
                return todo;
            }
        }));
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