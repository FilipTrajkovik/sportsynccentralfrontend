import MatchRepository from "../../repository/matchRepository";
import React, {useEffect, useState} from "react";
import {Col, Container, Row, Table} from "react-bootstrap";
import '../aggregation/aggregation.css'

const MatchWithCapacity = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        MatchRepository.getAllMatchesWithCapacity()
            .then((response) => {
                    setMatches(response.data)
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
                                <th>Match date</th>
                                <th>Start time</th>
                                <th>Sport type</th>
                                <th>Sports Hall</th>
                                <th>Sports Hall capacity</th>
                                <th>Seat availability </th>
                                <th>Seat sector</th>
                                <th>Seat row</th>
                                <th>Seat number</th>
                            </tr>
                            </thead>
                            <tbody className={"text-center"}>
                            {matches.map((match) => (
                                <tr style={{ verticalAlign: "middle" }} key={match.id}>
                                    <td>{match.matchName}</td>
                                    <td>{match.matchDate}</td>
                                    <td>{match.matchStartTime}</td>
                                    <td>{match.matchSportType}</td>
                                    <td>{match.sportHallName}</td>
                                    <td>{match.sportHallCapacity}</td>
                                    <td>True</td>
                                    <td>{match.seatSector}</td>
                                    <td>{match.seatRow}</td>
                                    <td>{match.seatNumber}</td>
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

export default MatchWithCapacity;