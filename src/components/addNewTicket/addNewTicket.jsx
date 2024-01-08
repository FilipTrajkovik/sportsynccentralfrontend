import React, {useEffect, useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import TeamRepository from '../../repository/teamRepository';
import SportHallRepository from '../../repository/sportHallRepository';
import MatchRepository from '../../repository/matchRepository';
import {useNavigate} from 'react-router-dom';
import {Container} from "react-bootstrap";

import {Modal} from 'react-bootstrap';
import SpectatorRepository from "../../repository/spectatorRepository";
import TicketRepository from "../../repository/ticketRepository";

const AddNewTicket = (props) => {
    const navigate = useNavigate();

    const [spectators, setSpectators] = useState([]);

    const [formDataMatch, setFormDataMatch] = useState({
        price: '',
        locationBought: '',
        idSpectator: null,
        idMatch: props.matchId,
        idSeat: props.seatId,
        idSportHall: props.sportHallId,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        SpectatorRepository.getAllSpectators().then((response) => {
            setSpectators(response.data);
        });
    };

    const handleChangeReview = (e) => {
        setFormDataMatch({
            ...formDataMatch,
            [e.target.name]: e.target.value,
        });
    };

    const sendMatchData = () => {
        if (
            formDataMatch.price === '' ||
            formDataMatch.locationBought === '' ||
            formDataMatch.idSpectator == null
        ) {
        } else {
            let matchId = props.matchId
            let seatId = props.seatId
            let sportHallId = props.sportHallId
            TicketRepository.addNewTicket(formDataMatch, seatId, matchId, sportHallId).then(() => {
                navigate(`/matchdetails/${props.matchId}`);
                window.location.reload();
                props.handleClose();
                alert("Ticket has been bought")
            });
            setFormDataMatch({
                price: '',
                locationBought: '',
                idSpectator: null,
                idMatch: props.matchId,
                idSeat: props.seatId,
                idSportHall: props.sportHallId,
            });
        }
    };

    return (
        <Modal show={props.isOpen} onHide={props.handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Buy ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className={"pb-3 px-auto bg-light"}>
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <FormControl style={{width: 100 + "%"}} margin={"normal"}>
                                <InputLabel id="demo-simple-select-label">
                                    Spectators
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Sport Halls"
                                    onChange={handleChangeReview}
                                    name={"idSpectator"}
                                    value={formDataMatch.idSpectator}
                                    required={true}
                                >
                                    {spectators.map((element) => (
                                        <MenuItem
                                            style={{maxWidth: "initial"}}
                                            key={element.id}
                                            value={element.id}
                                        >
                                            {element.name} {element.surname}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <div className={"col-6"}>
                            <FormControl style={{width: 100 + "%"}} margin={"auto"}>
                                <TextField
                                    id="outlined-basic"
                                    label="Price"
                                    variant="outlined"
                                    name={"price"}
                                    margin={"normal"}
                                    onChange={handleChangeReview}
                                    value={formDataMatch.price}
                                    type={"text"}
                                    required={true}
                                />
                            </FormControl>
                        </div>

                        <div className={"col-12"}>
                            <FormControl style={{width: 100 + "%"}} margin={"auto"}>
                                <TextField
                                    id="outlined-basic"
                                    label="Location bought"
                                    variant="outlined"
                                    name={"locationBought"}
                                    margin={"normal"}
                                    onChange={handleChangeReview}
                                    value={formDataMatch.locationBought}
                                    type={"text"}
                                    required={true}
                                />
                            </FormControl>
                        </div>
                    </div>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="contained" color="error" style={{marginRight: "5px"}} onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="contained" color="success" onClick={sendMatchData}>
                    Buy
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddNewTicket;
