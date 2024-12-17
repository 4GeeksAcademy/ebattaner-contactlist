import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import { NavLink } from "react-router";

const Nuevocontacto = () => {
  const [nomApe, setNomApe] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const url = "https://playground.4geeks.com";
  let { slug } = useParams();
  const getslug = `${url}/agendas/${slug}/contacts/`;

  const nuevoUsuario = (e) => {
    e.preventDefault();

    const nuevoContacto = {
      name: nomApe,
      phone: telefono,
      email: email,
      address: direccion,
    };
    console.log(nuevoContacto);

    fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoContacto),
    }).then(() => {
      setNomApe("");
      setEmail("");
      setTelefono("");
      setDireccion("");
    });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center m-5">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <Button variant="danger" className="p-2 m-2">
            <NavLink to={`/agendas/${slug}`}>Atrás</NavLink>
          </Button>
          <Form>
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

            <Button variant="primary" type="submit" onClick={nuevoUsuario}>
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Nuevocontacto;
