import { useState } from "react"
import Todo from "./Todo"
import { useLocation, useNavigate } from "react-router-dom";

const Form = () => {
    // const [todos, setTodos] = useState([
    //     { todo: "tarea " }, //Producto 1 Producto 2 Producto 3
    //     { todo: "tarea " },
    //     { todo: "tarea " }
    // ])

    const [todos, setTodos] = useState([])

    //Asi seteo un estado en React, y en teoria esto hace que solo se renderize y cambie, si es que cambia... O ALGO ASI
    const [todo, setTodo] = useState("");

    const handleChange = (event) => setTodo(event.target.value) //No se que carajo es target, ni porque carajo se llama event lo anterior
    
    const handleClick = (event) => {
        if (todo.trim() === "") {
            alert("el campo no puede estar vacio")
            return
        }
        setTodos([...todos, { todo }]) //spread operator ...
        setTodo("")
    }

    const navigate = useNavigate()
    const handleNavigateClick = (event) => {
        navigate("/demo")
    }

    const location = useLocation() //Esto me dice en que ruta estoy parado. 



    //Revisar bien esto, poprque lo que hace es pasarselo despues como Arg a un Child Component dentro de este component. 
    const deleteTodo = index => {
        const newTodo = [...todo]
        newTodo.splice(index, 1)
        setTodos(newTodo)
    }

    return ( ////el name <input type = "text" name="todo" onClick={}></input>  tiene que coincidr con el estao local del useState (el de const [todo, setTodo] = useState({});)
        /* este onSubmit y el event.preventDefault es porque sino por default el form le aplica un refresh cada vez que clickeas un btn o le das enter a un input */

        <>
            <form onSubmit={event => event.preventDefault()}>

                <label>Agregar Tarea</label>
                <input type="text" name="todo" onChange={handleChange}></input>
                <button onClick={handleClick}>Agregar</button>
                <button onClick={handleNavigateClick}>Navegar a Demo</button>
                {
                    todos.map((value, index) => ( //Como javascript es una negrada total, el map automagicamente sabe que la primer cosa es el VALUE que esta iterando, y el segundo es el INDEX, le podes poner a los dos JavaScriptEsBasura, JavaScriptNoMeGusta, y funciona igual
                        <Todo key={index} todo={value.todo} index={index} deleteTodo={deleteTodo} />
                    ))
                }
                <p>
                    La ruta actual es: {location.pathname}
                </p>
            </form>



        </>
    )
}
export default Form