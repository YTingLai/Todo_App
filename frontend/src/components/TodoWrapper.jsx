import CreateForm from "./CreateForm";

function TodoWrapper() {

    return (
        <div className="wrapper">
            <h1>待辦事項</h1>
            <CreateForm />
        </div>
    );
}

// 導出元件
export default TodoWrapper