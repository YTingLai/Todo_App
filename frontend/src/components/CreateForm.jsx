import { useState } from "react";

function CreateForm({addTodo}) {

    const [content, setContent] = useState('');

    /* 將 <input> 的 value 綁定到 React 的 state，並透過 onChange 在輸入時更新 state
        - e : 事件物件，存事件發生時的所有相關資訊
        - e.target.value : 取得在輸入框內輸入的值
    */
    const handleChange = (e) => {
        setContent(e.target.value);
    };

    /* 點擊 <button> 後，觸發 onSubmit，新增 todo
        - .preventDefault() : 阻止瀏覽器執行事件的預設行為
        - .trim() : 清除字串首尾的空白
    */
    const handleSubmit = (e) => {
        e.preventDefault();  // 阻止表單提交後重新整理頁面的行為
        if(content.trim()) {  // 排除空字串或只有空白的輸入
            addTodo(content);
        }
        setContent('');  // 清空輸入框的資料
    };

    return (
        <form className="create-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="輸入待辦事項" className="create-form-input" value={content} onChange={handleChange}></input>
            <button type="submit" className="create-form-button">加入</button>
        </form>
    );
}

export default CreateForm