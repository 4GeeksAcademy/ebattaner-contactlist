import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import { NavLink } from "react-router";

const Editarcontacto = () => {
  const [nomApe, setNomApe] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const url = "https://playground.4geeks.com";
  const { slug, id } = useParams();
  const getContactUrl = `${url}/agendas/${slug}/contacts/${id}`;

  useEffect(() => {
    fetch(getContactUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos del contacto");
        }
        return response.json();
      })
      .then((data) => {
        setNomApe(data.name || "");
        setEmail(data.email || "");
        setTelefono(data.phone || "");
        setDireccion(data.address || "");
      })
      .catch((error) => console.error("Error en el GET:", error));
  }, [getContactUrl]);

  const editarUsuario = (e) => {
    e.preventDefault();

    const editarContacto = {
      name: nomApe,
      email: email,
      phone: telefono,
      address: direccion,
    };

    fetch(getContactUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editarContacto),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar el contacto");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Contacto actualizado correctamente:", data);
        alert("El contacto se ha actualizado con éxito.");
      })
      .catch((error) => console.error("Error en el PUT:", error));
  };

  return (
    <Container className="d-flex justify-content-center align-items-center m-5">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <Button variant="danger" className="p-2 m-2">
            <NavLink to={`/agendas/${slug}`}>Atrás</NavLink>
          </Button>
          <Form onSubmit={editarUsuario}>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Nombre y Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre y Apellidos"
                value={nomApe}
                onChange={(e) => setNomApe(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPhone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                placeholder="Dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Editarcontacto;
