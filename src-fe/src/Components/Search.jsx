import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleSearch = () => {
    const newParams = new URLSearchParams(searchParams);

    // Establecer el nuevo valor del parámetro 'search'
    newParams.set("name", productName);

    // Convertir los parámetros a una cadena y actualizar la URL del navegador
    navigate(`/products?${newParams.toString()}`);
  };

  const [productName, setproductName] = useState(
    searchParams.has("name") ? searchParams.get("name") : ""
  );

  const hangleNameChange = (value) => {
    setproductName(value.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevenir el comportamiento predeterminado
      handleSearch();
    }
  };

  return (
    <Form>
      <InputGroup>
        <Form.Control
          type="search"
          placeholder="Buscar productos"
          aria-label="Search"
          onKeyDown={handleKeyDown}
          onChange={(e) => hangleNameChange(e)}
        />
        <Button variant="outline-success" onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default Search;
