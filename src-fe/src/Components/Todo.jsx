const Todo = ({ todo, index, deleteTodo }) => {
    return (
        <div >
            <span>
                <div> Tarea por hacer: {todo}</div>
            </span>
            <span>
                <button onClick={() => deleteTodo(index)}>X</button>
            </span>
        </div>
    )
}
export default Todo