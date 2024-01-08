import SpectatorAttedenceRepository from "../../repository/spectatorAttedence";
import React, {useEffect, useState} from "react";
import {Col, Container, Row, Table} from "react-bootstrap";
import '../aggregation/aggregation.css'

const SpectatorAttendence = () => {
    const [spectators, setSpectators] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        SpectatorAttedenceRepository.getAllSpectatorAttedences()
            .then((response) => {
                    setSpectators(response.data)
                }
            );
    }


    return (
        <>
            <Container className={"fragment-style"} style={{marginTop:'50px'}}>
                <Row>
                    <Col>
                        <Table className="mt-5 table table-light table-striped">
                            <thead className={"text-center"}>
                            <tr>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Seat sector</th>
                                <th>Seat number</th>
                                <th>Seat row</th>
                                <th>Sport Hall name</th>
                                <th>Sport Hall location</th>
                                <th>Match name</th>
                                <th>Match sport type</th>
                            </tr>
                            </thead>
                            <tbody className={"text-center"}>
                            {spectators.map((spectator) => (
                                <tr style={{ verticalAlign: "middle" }} key={spectator.id}>
                                    <td>{spectator.spectatorName}</td>
                                    <td>{spectator.spectatorSurname}</td>
                                    <td>{spectator.seatSector}</td>
                                    <td>{spectator.seatNumber}</td>
                                    <td>{spectator.seatRow}</td>
                                    <td>{spectator.sportHallName}</td>
                                    <td>{spectator.sportHallLocation}</td>
                                    <td>{spectator.matchName}</td>
                                    <td>{spectator.matchSportType}</td>
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

export default SpectatorAttendence;