import { useState } from "react";
import CreateForm from "./CreateForm";
import Todo from "./Todo";

function TodoWrapper() {

    const initialTodos = [
        {id: Math.random(), content: "打掃房間", isCompleted: true, isEditing: false},
        {id: Math.random(), content: "寫程式", isCompleted: false, isEditing: false},
        {id: Math.random(), content: "倒垃圾", isCompleted: false, isEditing: true},
    ];
    const [todos, setTodos] = useState(initialTodos);

    /* 新增 todo */
    const addTodo = (content) => {
        setTodos([...todos, {id: Math.random(), content: content, isCompleted: false, isEditing: false}]);
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

    return (
        <div className="wrapper">
            <h1>待辦事項</h1>
            <CreateForm addTodo={addTodo} />
            {todos.map((todo) => {  // map() : 遍歷原陣列的每個元素，透過指定的函式進行處理，回傳一個處理好的新陣列
                return <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} />
            })}
        </div>
    );
}

// 導出元件
export default TodoWrapper