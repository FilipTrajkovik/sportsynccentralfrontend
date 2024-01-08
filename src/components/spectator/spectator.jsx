import SpectatorAttedenceRepository from "../../repository/spectatorAttedence";
import React, {useEffect, useState} from "react";
import {Col, Container, Row, Table} from "react-bootstrap";

const Spectator = () => {
    const [spectators, setSpectators] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        SpectatorAttedenceRepository.getAllSpectators()
            .then((response) => {
                    setSpectators(response.data)
                }
            );
    }


    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Table className="mt-5 table table-light">
                            <thead className={"text-center"}>
                            <tr>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>phoneNumber</th>
                                <th>email</th>
                            </tr>
                            </thead>
                            <tbody className={"text-center"}>
                            {spectators.map((spectator) => (
                                <tr style={{ verticalAlign: "middle" }} key={spectator.id}>
                                    <td>{spectator.name}</td>
                                    <td>{spectator.surname}</td>
                                    <td>{spectator.phoneNumber}</td>
                                    <td>{spectator.email}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Spectator;