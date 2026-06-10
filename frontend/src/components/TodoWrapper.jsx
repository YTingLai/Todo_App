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

    return (
        <div className="wrapper">
            <h1>待辦事項</h1>
            <CreateForm />
            {todos.map((todo) => {  // map() : 遍歷原陣列的每個元素，透過指定的函式進行處理，回傳一個處理好的新陣列
                return <Todo key={todo.id} todo={todo} />
            })}
        </div>
    );
}

// 導出元件
export default TodoWrapper