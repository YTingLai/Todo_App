function EditForm({todo}) {

    return (
        <form className="edit-form">
            <input type="text" placeholder="輸入待辦事項" value={todo.content} className="edit-form-input"></input>
            <button type="submit" className="edit-form-button">完成</button>
        </form>
    );
}

export default EditForm