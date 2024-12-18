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
  const getslug = `${url}/agendas/${slug}/contacts/`;
  const deleteslug = `${url}/agendas/${slug}/contacts/${id}`;

  // Cargar los datos del contacto si existe un ID
  useEffect(() => {
    fetch(deleteslug)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo obtener el contacto");
        }
        return response.json();
      })
      .then((data) => {
        setNomApe(data.name);
        setEmail(data.email);
        setTelefono(data.phone);
        setDireccion(data.address);
      })
      .catch((error) => console.error(error.message));
  }, []);

  const nuevoUsuario = async (e) => {
    e.preventDefault();

    const nuevoContacto = {
      name: nomApe,
      phone: telefono,
      email: email,
      address: direccion,
    };

    try {
      // Eliminar el contacto existente si hay un ID
      if (id) {
        const deleteResponse = await fetch(deleteslug, {
          method: "DELETE",
        });
        if (!deleteResponse.ok) {
          throw new Error("Error al eliminar el contacto existente");
        }
        console.log("Contacto eliminado correctamente");
      }

      // Crear un nuevo contacto
      const postResponse = await fetch(getslug, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoContacto),
      });

      if (!postResponse.ok) {
        throw new Error("Error al crear el nuevo contacto");
      }

      console.log("Nuevo contacto creado correctamente");

      // Resetear los valores del formulario
      setNomApe("");
      setEmail("");
      setTelefono("");
      setDireccion("");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center m-5">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <Button variant="danger" className="p-2 m-2">
            <NavLink to={`/agendas/${slug}`}>Atrás</NavLink>
          </Button>
          <Form onSubmit={nuevoUsuario}>
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
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Editarcontacto;
