function CreateForm() {

    return (
        <form className="create-form">
            <input type="text" placeholder="輸入待辦事項" className="create-form-input"></input>
            <button type="submit" className="create-form-button">加入</button>
        </form>
    );
}

export default CreateForm