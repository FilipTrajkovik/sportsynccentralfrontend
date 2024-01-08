import MatchRepository from "../../repository/matchRepository";
import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import AddNewMatchModal from '../addNewMatch/addNewMatch'
import {useHistory, useNavigate} from 'react-router-dom';
import './match.css'
import {Link} from "@mui/material";

const Match = () => {
    const [matches, setMatches] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        MatchRepository.getAllMatches()
            .then((response) => {
                    setMatches(response.data)
                }
            );
    }

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const isMatchInFuture = (match) => {
        const matchDateTime = new Date(`${match.matchDate}T${match.startTime}`);
        const now = new Date();
        return matchDateTime > now;
    };

    return (
        <>
            <Container className={"mt-3 p-3 containerStyle"}>
                <Row>
                    <Col>
                        <Button onClick={openAddModal} className="btn btn-secondary btn-sm mb-3">
                            Add new match
                        </Button>

                        <AddNewMatchModal isOpen={isAddModalOpen} handleClose={closeAddModal}/>

                        <Row>
                            {matches.map((match) => (
                                <Col key={match.id} md={4} className="mb-3">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{match.name}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                {match.sportType} - {match.category}
                                            </Card.Subtitle>
                                            <Card.Text>
                                                {`${match.matchSportHall.name}, ${match.matchDate}, ${match.startTime} - ${match.endTime}`}
                                            </Card.Text>
                                        </Card.Body>
                                        <Button
                                            as = {Link}
                                            href={`/matchdetails/${match.id}`}
                                            selectedMatch={match}
                                            className="btn btn-secondary btn-sm mb-3 w-50 mx-auto text-black fw-bold"
                                            disabled={!isMatchInFuture(match)}>
                                            Details
                                        </Button>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Match;