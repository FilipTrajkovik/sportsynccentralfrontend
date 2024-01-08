import MatchRepository from "../../repository/matchRepository";
import React, {useEffect, useState} from "react";
import {Col, Container, Row, Table} from "react-bootstrap";
import '../aggregation/aggregation.css'

const MatchWithGuestTeamsAndPlayers = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        MatchRepository.getAllMatchWithGuestTeamsAndPlayersView()
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
                                <th>Sport type</th>
                                <th>Category</th>
                                <th>Guest team</th>
                                <th>Player name</th>
                                <th>Player surname</th>
                            </tr>
                            </thead>
                            <tbody className={"text-center"}>
                            {matches.map((match) => (
                                <tr style={{ verticalAlign: "middle" }} key={match.id}>
                                    <td>{match.matchName}</td>
                                    <td>{match.matchDate}</td>
                                    <td>{match.sportType}</td>
                                    <td style={{ width: "10%" }}>{match.category}</td>
                                    <td>{match.guestTeamName}</td>
                                    <td>{match.playerGuestName}</td>
                                    <td>{match.playerGuestSurname}</td>
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

export default MatchWithGuestTeamsAndPlayers;