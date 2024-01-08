import React, {useEffect, useState} from "react";
import {Col, Container, Row, Table} from "react-bootstrap";
import AggregationRepository from "../../repository/aggregationRepository";
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './aggregation.css'


const Aggregation = () => {
    const [spectator, setSpectator] = useState([]);
    const [players, setPlayers] = useState([]);
    const [seats, setSeats] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        AggregationRepository.getSpectatorWithMostTicketsForLastYear()
            .then((response) => {
                setSpectator(response.data)
            })

        AggregationRepository.getPlayersMatchesPlayedWithAttendence()
            .then((response) => {
                setPlayers(response.data)
            })

        AggregationRepository.getFutureMatchesRemainingCapacity()
            .then((response) => {
                setSeats(response.data)
            })
    }

    const bull = (
        <Box
            component="span"
            sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
        >
            •
        </Box>
    );

    return (
        <>
            <React.Fragment>
                <Col md={4} className={"mx-auto fragment-style mt-5"}>
                    <CardContent>
                        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                            Spectator with most tickets bought in the last year
                        </Typography>
                        <Typography variant="h5" component="div">
                            {spectator.spectatorName} {spectator.spectatorSurname}
                        </Typography>
                        <Typography sx={{ fontSize: 18 }} variant="body2">
                            Tickets bought: {spectator.max}
                        </Typography>
                    </CardContent>
                </Col>
            </React.Fragment>

            <h3 className={"text-center mt-5 table-title"}>Player matches played with attendence in those matches</h3>
            <Container className={"fragment-style"}>
                <Row>
                    <Col>
                        <Table className="mt-5 table table-light table-striped">
                            <thead className={"text-center table-header"}>
                            <tr>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Matches played</th>
                                <th>Total visits on played matches</th>
                            </tr>
                            </thead>
                            <tbody className={"text-center"}>
                            {players.map((player) => (
                                <tr style={{verticalAlign: "middle"}} key={player.id}>
                                    <td>{player.name}</td>
                                    <td>{player.surname}</td>
                                    <td>{player.matchesPlayed}</td>
                                    <td>{player.totalVisits}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

            <h3 className={"text-center mt-5 table-title"}>Future matches seats left</h3>
            <Container className={"mb-5 fragment-style"}>
                <Row>
                    <Col>
                        <Table className="mt-5 table table-light table-striped">
                            <thead className={"text-center table-header"}>
                            <tr>
                                <th>Match name</th>
                                <th>Match date</th>
                                <th>Start time</th>
                                <th>Sport hall name</th>
                                <th>Total capacity</th>
                                <th>Seats sold</th>
                                <th>Seats left</th>
                            </tr>
                            </thead>
                            <tbody className={"text-center"}>
                            {seats.map((seat) => (
                                <tr style={{verticalAlign: "middle"}} key={seat.id}>
                                    <td>{seat.matchName}</td>
                                    <td>{seat.matchDate}</td>
                                    <td>{seat.startTime}</td>
                                    <td>{seat.sportHallName}</td>
                                    <td>{seat.totalCapacity}</td>
                                    <td>{seat.soldSeats}</td>
                                    <td>{seat.seatsLeft}</td>
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

export default Aggregation;