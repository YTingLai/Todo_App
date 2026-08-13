import { useEffect, useState } from "react";
import CreateForm from "./CreateForm";
import Todo from "./Todo";
import { addTodoApi, deleteTodoApi, editTodoApi, getAllTodoApi, toggleCompletedApi } from "../api/todoApi";
import { toast } from "sonner";

function TodoWrapper() {

    const [todos, setTodos] = useState(null);

    /* 將 API 回傳的 Todo 資料轉換成前端使用的格式，並加入 UI 狀態欄位 */
    const mapTodo = (todo) => {
        return {...todo, isEditing: false};
    };

    /* 取得多筆 Todo */
    const getAllTodo = async () => {
        try {
            const data = await getAllTodoApi();

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
            const todo = await addTodoApi(content);

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
            await deleteTodoApi(id);  // await : 等待 DELETE Request 完成後，再更新 UI

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
            const updateTodo = await editTodoApi(id, newContent);

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
            const updateTodo = await toggleCompletedApi(id);

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

    /* 判斷 Todo 列表目前的狀態
        - map() : 遍歷原陣列的每個元素，透過指定的函式進行處理，回傳一個處理好的新陣列
    */
    let todoListContent;

    if(todos === null) {  // 尚未取得 Todo
        todoListContent = null;
    } else if(todos.length === 0) {  // API 成功回傳空陣列
        todoListContent = <p>目前沒有 Todo</p>
    } else {  // API 成功回傳有內容的陣列
        todoListContent = todos.map((todo) => {
            return <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleEditing={toggleEditing} editTodo={editTodo} toggleCompleted={toggleCompleted} />
        });
    }

    return (
        <div className="wrapper">
            <h1>待辦事項</h1>
            <CreateForm addTodo={addTodo} />
            {todoListContent}
        </div>
    );
}

// 導出元件
export default TodoWrapper