import { useState } from "react";

function EditForm({todo}) {

    const [content, setContent] = useState(todo.content);

    /* 將 <input> 的 value 綁定到 React 的 state，並透過 onChange 在輸入時更新 state
        - e : 事件物件，存事件發生時的所有相關資訊
        - e.target.value : 取得在輸入框內輸入的值
    */
    const handleChange = (e) => {
        setContent(e.target.value);
    };

    return (
        <form className="edit-form">
            <input type="text" placeholder="輸入待辦事項" value={content} className="edit-form-input" onChange={handleChange}></input>
            <button type="submit" className="edit-form-button">完成</button>
        </form>
    );
}

export default EditForm