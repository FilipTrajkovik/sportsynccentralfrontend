import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import MatchRepository from "../../repository/matchRepository";
import MatchDetailsRepository from '../../repository/matchDetailsRepository'
import './matchDetails.css'
import Accordion from 'react-bootstrap/Accordion';
import SeatsTable from "../seatsTable/seatsTable";

const MatchDetails = (props) => {
    const [match, setMatch] = useState({});
    const [homeTeamPlayers, setHomeTeamPlayers] = useState([]);
    const [guestTeamPlayers, setGuestTeamPlayers] = useState([]);
    const [seatsAvailable, setSeatsAvailable] = useState([]);
    const [homeTeam, setHomeTeam] = useState({});
    const [guestTeam, setGuestTeam] = useState({});
    const [sportHall, setSportHall] = useState({});
    const [remainingTime, setRemainingTime] = useState("");
    const [isTableVisible, setIsTableVisible] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        let matchId = window.location.href.split("/").at(-1);
        fetchMatch(matchId);
        fetchHomeTeamPlayers(matchId);
        fetchGuestTeamPlayers(matchId);
        fetchSeatsAvailable(matchId);
    }

    const fetchMatch = (matchId) => {
        MatchRepository.getMatch(matchId)
            .then((response) => {
                setMatch(response.data)
                setHomeTeam(response.data.homeTeam)
                setGuestTeam(response.data.guestTeam)
                setSportHall(response.data.matchSportHall)
                calculateRemainingTime(response.data.matchDate, response.data.startTime);
            })
            .catch((error) => {
                console.error('Error fetching home team players:', error);
            });
    };

    const fetchHomeTeamPlayers = (matchId) => {
        MatchDetailsRepository.getHomeTeamPlayers(matchId)
            .then((response) => {
                setHomeTeamPlayers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching home team players:', error);
            });
    };

    const fetchGuestTeamPlayers = (matchId) => {
        MatchDetailsRepository.getGuestTeamPlayers(matchId)
            .then((response) => {
                setGuestTeamPlayers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching guest team players:', error);
            });
    };

    const fetchSeatsAvailable = (matchId) => {
        MatchDetailsRepository.getSeatsAvailableForMatch(matchId)
            .then((response) => {
                setSeatsAvailable(response.data);
            })
            .catch((error) => {
                console.error('Error fetching seats available:', error);
            });
    };

    const calculateRemainingTime = (matchDate, startTime) => {
        const matchDateTime = new Date(`${matchDate} ${startTime}`);
        const now = new Date();

        const diffMilliseconds = matchDateTime - now;
        const diffSeconds = Math.floor(diffMilliseconds / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        const diffMonths = Math.floor(diffDays / 30.44);
        const diffYears = Math.floor(diffMonths / 12);

        if (diffYears > 0) {
            setRemainingTime(`${diffYears} years ${diffMonths % 12} months ${diffDays % 30} days ${diffHours % 24} hours ${diffMinutes % 60} minutes`);
        } else if (diffMonths > 0) {
            setRemainingTime(`${diffMonths} months ${diffDays % 30} days ${diffHours % 24} hours ${diffMinutes % 60} minutes`);
        } else if (diffDays > 0) {
            setRemainingTime(`${diffDays} days ${diffHours % 24} hours ${diffMinutes % 60} minutes`);
        } else if (diffHours > 0) {
            setRemainingTime(`${diffHours} hours ${diffMinutes % 60} minutes`);
        } else {
            setRemainingTime(`${diffMinutes} minutes`);
        }
    };

    const renderSeatsTable = () => {
        return (
            <SeatsTable
                seatsAvailable={seatsAvailable}
            />
        );
    };

    return (
        <Card className="text-center containerStyle mt-5 w-50">
            <Card.Header><h3>{match.name}</h3></Card.Header>
            <Card.Body>
                <Card.Title>{`${match.sportType} - ${match.category}`}</Card.Title>
                <Card.Text>
                    <h6>{`${sportHall.name} - ${sportHall.location}`}</h6>
                    <h6>{`${sportHall.name} / ${match.matchDate} / ${match.startTime} - ${match.endTime}`}</h6>
                    <br/>
                    <div className={"d-inline-block d-flex justify-content-between col-8 mx-auto"}>
                        <Accordion className={"col mx-3"}>
                            <Accordion.Item eventKey="0" className={"acc-body"}>
                                <Accordion.Header>
                                    <div className={"text-center fw-bold"}>
                                        {`${homeTeam.name}`}'s players
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    {homeTeamPlayers.map((player) => (
                                        <div key={player.id} className={"text-left"}>
                                            {`${player.playerHostName} ${player.playerHostSurname}`}
                                        </div>
                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                        <Accordion className={"col mx-3"}>
                            <Accordion.Item eventKey="1" className={"acc-body"}>
                                <Accordion.Header>
                                    <div className={"text-center fw-bold"}>
                                        {`${guestTeam.name}`}'s players
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    {guestTeamPlayers.map((player) => (
                                        <div
                                            key={player.id}>{`${player.playerGuestName} ${player.playerGuestSurname}`}</div>
                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>

                </Card.Text>
                <Button style={{backgroundColor: '#529898FF', marginBottom:'10px', border:'none'}} onClick={() => setIsTableVisible(!isTableVisible)}>
                    {isTableVisible ? 'Hide Tickets' : 'Show Available Tickets'}
                </Button>
                {isTableVisible && renderSeatsTable()}
            </Card.Body>
            <Card.Footer className="text-muted">Remaining Time: {remainingTime}</Card.Footer>
        </Card>
    );
}

export default MatchDetails;
