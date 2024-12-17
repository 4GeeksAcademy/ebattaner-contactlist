import { useEffect, useState } from "react";
import { isEmpty } from "lodash";

import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router";

export const Listagendas = () => {
  const [agendas, setAgendas] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const url = "https://playground.4geeks.com/contact";
  const getAgendas = `${url}/agendas`;

  const fetchAgendas = () => {
    fetch(getAgendas, { method: "GET" })
      .then((response) => response.json())
      .then((data) => setAgendas(data.agendas || []));
  };

  useEffect(() => {
    fetchAgendas();
  }, []);

  const nuevaAgenda = () => {
    if (inputValue !== "") {
      fetch(`${getAgendas}/${inputValue}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: inputValue, done: false }),
      }).then(() => {
        setInputValue("");
        fetchAgendas();
      });
    }
  };

  const eliminaAgenda = (id) => {
    fetch(`${getAgendas}/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchAgendas();
    });
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center">
        <Row className="w-100">
          <Col md={6} className="mx-auto">
            <h1>AGENDAS:</h1>
            <ListGroup>
              <ListGroup.Item>
                <input
                  placeholder="Nueva Agenda"
                  id="input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Button variant="success" onClick={nuevaAgenda}>
                  Crear
                </Button>
              </ListGroup.Item>
              {!isEmpty(agendas) &&
                agendas.map((item) => (
                  <ListGroup.Item key={item.slug}>
                    <Stack direction="horizontal" gap={3}>
                      <div className="p-2">
                        <b>{item.slug}</b>
                      </div>
                      <div className="p-2 ms-auto">
                        <Button variant="info">
                          <NavLink to={`/agendas/${item.slug}`}>Ver</NavLink>
                        </Button>
                      </div>
                      <div className="vr" />
                      <div className="p-2">
                        <Button
                          variant="danger"
                          onClick={() => eliminaAgenda(item.slug)}
                        >
                          Borrar
                        </Button>
                      </div>
                    </Stack>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};
