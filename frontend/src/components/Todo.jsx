import { FaRegSquareCheck, FaRegSquare } from "react-icons/fa6";  // 導入已完成的核取方塊(打勾) + 未完成的核取方塊(空格)
import { MdEdit, MdDelete } from "react-icons/md";  // 導入編輯圖示(筆) + 刪除圖示(垃圾桶)

function Todo({todo}) {

    // 判斷 todo 內容目前的完成狀態
    const CheckboxIcon = todo.isCompleted ? FaRegSquareCheck : FaRegSquare;

    return (
        <div className={`todo ${todo.isCompleted ? "completed" : ""}`}>
            <div className="todo-left">
                <CheckboxIcon className="checkbox" />
                <p className="todo-content">{todo.content}</p>
            </div>
            <div className="todo-right">
                <MdEdit className="function-icon"/>
                <MdDelete className="function-icon"/>
            </div>
        </div>
    );
}

export default Todo