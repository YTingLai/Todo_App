import { FaRegSquareCheck, FaRegSquare } from "react-icons/fa6";  // 導入已完成的核取方塊(打勾) + 未完成的核取方塊(空格)
import { MdEdit, MdDelete } from "react-icons/md";  // 導入編輯圖示(筆) + 刪除圖示(垃圾桶)
import EditForm from "./EditForm";

function Todo({todo, deleteTodo}) {

    // 判斷 todo 內容目前的完成狀態
    const CheckboxIcon = todo.isCompleted ? FaRegSquareCheck : FaRegSquare;

    /* 點擊刪除圖示後，觸發 onClick，刪除指定的 todo */
    const handleDeleteClick = () => {
        deleteTodo(todo.id);
    };

    if(todo.isEditing) {  // 編輯狀態
        return (
            <EditForm todo={todo} />
        );
    } else {  // 非編輯狀態
        return (
            <div className={`todo ${todo.isCompleted ? "completed" : ""}`}>
                <div className="todo-left">
                    <CheckboxIcon className="checkbox" />
                    <p className="todo-content">{todo.content}</p>
                </div>
                <div className="todo-right">
                    <MdEdit className="function-icon"/>
                    <MdDelete className="function-icon" onClick={handleDeleteClick} />
                </div>
            </div>
        );
    }
}

export default Todo