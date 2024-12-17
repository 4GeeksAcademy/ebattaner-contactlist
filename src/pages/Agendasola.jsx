import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import { NavLink } from "react-router";

const Agendasola = () => {
  const url = "https://playground.4geeks.com/contact";
  const getAgendas = `${url}/agendas`;
  let { slug } = useParams();
  const getslug = `${getAgendas}/${slug}/contacts`;
  const [usuario, setUsuario] = useState([]);

  const eliminaUsuario = (id) => {
    fetch(`${getslug}/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchUsuarios();
    });
  };

  const fetchUsuarios = () => {
    fetch(getslug, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setUsuario(data.contacts || []);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <>
      {" "}
      <Container className="d-flex justify-content-center align-items-center">
        <Row className="w-100">
          <Col md={6} className="mx-auto">
            <h1>Agenda de {slug}</h1>
            <Stack direction="horizontal" gap={3}>
              <div className="p-2">
                <Button variant="danger" className="p-2 m-2">
                  <NavLink to={`/`}>Atrás</NavLink>
                </Button>
              </div>
              <div className="p-2">
                <Button variant="info" className="p-2 m-2">
                  <NavLink to={`/agendas/${slug}/Nuevocontacto`}>
                    Nuevo Contacto
                  </NavLink>
                </Button>
              </div>
            </Stack>
            {usuario.map((item) => {
              return (
                <ListGroup>
                  <ListGroup.Item>
                    <Stack direction="horizontal" gap={3}>
                      <div className="p-2">
                        <Image
                          src="https://picsum.photos/id/237/100/100"
                          roundedCircle
                        />
                      </div>
                      <div className="p-2 ">
                        <h4>{item.name}</h4>
                        <p>
                          <b>Dirección:</b> {item.address} <br></br>{" "}
                          <b>Teléfono:</b> {item.phone} <br></br> <b>Email:</b>{" "}
                          {item.email}
                        </p>
                      </div>
                      <div className="vr ms-auto" />
                      <div className="p-2">
                        <Stack direction="vertical" gap={3}>
                          <Button>
                            {" "}
                            <NavLink
                              to={`/agendas/${slug}/Editarcontacto/${item.id}`}
                            >
                              Editar
                            </NavLink>
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => eliminaUsuario(item.id)}
                          >
                            Borrar
                          </Button>
                        </Stack>
                      </div>
                    </Stack>
                  </ListGroup.Item>
                </ListGroup>
              );
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Agendasola;
