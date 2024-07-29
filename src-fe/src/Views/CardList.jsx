import Card from "../Components/Card/Card"

const CardList = () => {
    //Ojo no se pueden renderizar tags sueltos, todo tiene que tener un parent si quiero poner N childs.  por eso tag vacio <> </>
    return (
        <>
            <Card />
            <Card />
            <Card />
            <Card />
        </>
    )
}

export default CardList //Gracias a esto cualquiera puede ver el componente. 