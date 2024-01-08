import MatchRepository from "../../repository/matchRepository";
import React, {useEffect, useState} from "react";
import {Col, Container, Row, Table} from "react-bootstrap";
import '../aggregation/aggregation.css'

const MatchWithTeamsView = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        MatchRepository.getAllMatchWithTeamsView()
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
                                <th>Category</th>
                                <th>Sport type</th>
                                <th>Match date</th>
                                <th>Start time</th>
                                <th>Home team</th>
                                <th>Guest team</th>
                                <th>Sports Hall</th>
                                <th>Location</th>
                            </tr>
                            </thead>
                            <tbody className={"text-center"}>
                            {matches.map((match) => (
                                <tr style={{ verticalAlign: "middle" }} key={match.id}>
                                    <td>{match.matchName}</td>
                                    <td style={{ width: "10%" }}>{match.category}</td>
                                    <td>{match.sportType}</td>
                                    <td>{match.matchDate}</td>
                                    <td>{match.startTime}</td>
                                    <td>{match.homeTeamName}</td>
                                    <td>{match.guestTeamName}</td>
                                    <td>{match.sportHallName}</td>
                                    <td>{match.sportHallLocation}</td>
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

export default MatchWithTeamsView;