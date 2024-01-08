import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import TeamRepository from '../../repository/teamRepository';
import SportHallRepository from '../../repository/sportHallRepository';
import MatchRepository from '../../repository/matchRepository';
import { useNavigate } from 'react-router-dom';
import {Container} from "react-bootstrap";

import { Modal } from 'react-bootstrap';
import PlayerRepository from "../../repository/playerRepository";
import PlayerPlaysForTeamRepository from "../../repository/playerPlaysForTeamRepository";

const AddNewTeam = ({ isOpen, handleClose }) => {
    const navigate = useNavigate();

    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);

    const [formDataMatch, setFormDataMatch] = useState({
        idTeam: null,
        idPlayer: null,
        dateFrom: null,
        dateTo: null,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        TeamRepository.getAllTeams().then((response) => {
            setTeams(response.data);
        });

        PlayerRepository.getAll().then((response) => {
            setPlayers(response.data);
        });
    };

    const handleChangeReview = (e) => {
        setFormDataMatch({
            ...formDataMatch,
            [e.target.name]: e.target.value,
        });
    };

    const sendContractData = () => {
        if (
            formDataMatch.idTeam == null ||
            formDataMatch.idPlayer == null ||
            formDataMatch.dateFrom == null ||
            formDataMatch.dateTo == null
        ) {
        } else {
            PlayerPlaysForTeamRepository.addNewTeam(formDataMatch).then(() => {
                navigate('/playersContract');
                window.location.reload();
                handleClose();
                alert("New contract has been added" + formDataMatch.idTeam.name);
            });
            setFormDataMatch({
                idTeam: null,
                idPlayer: null,
                dateFrom: null,
                dateTo: null,
            });
        }
    };

    return (
        <Modal show={isOpen} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add new Contract</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className={"pb-3 px-auto bg-light"}>
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <FormControl style={{ width: 100 + "%" }} margin={"normal"}>
                                <InputLabel id="demo-simple-select-label">
                                    Choose team
                                </InputLabel>

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="idTeam"
                                    onChange={handleChangeReview}
                                    name={"idTeam"}
                                    value={formDataMatch.idTeam}
                                    required={true}
                                >
                                    {teams.map((element) => (
                                        <MenuItem
                                            style={{ maxWidth: "initial" }}
                                            key={element.id}
                                            value={element.id}
                                        >
                                            {element.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <div className={"col-6"}>
                            <FormControl style={{ width: 100 + "%" }} margin={"normal"}>
                                <InputLabel id="demo-simple-select-label">
                                    Choose player
                                </InputLabel>

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="idTeam"
                                    onChange={handleChangeReview}
                                    name={"idPlayer"}
                                    value={formDataMatch.idPlayer}
                                    required={true}
                                >
                                    {players.map((element) => (
                                        <MenuItem
                                            style={{ maxWidth: "initial" }}
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
                            <FormControl style={{ width: 100 + "%" }}>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    name={"dateFrom"}
                                    margin={"normal"}
                                    onChange={handleChangeReview}
                                    value={formDataMatch.dateFrom}
                                    type={"date"}
                                    required={true}
                                />
                            </FormControl>
                        </div>


                        <div className={"col-6"}>
                            <FormControl style={{ width: 100 + "%" }}>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    name={"dateTo"}
                                    margin={"normal"}
                                    onChange={handleChangeReview}
                                    value={formDataMatch.dateTo}
                                    type={"date"}
                                    required={true}
                                />
                            </FormControl>
                        </div>
                    </div>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="contained" color="error" style={{marginRight   :"5px"}}  onClick={handleClose}>
                    Close
                </Button>
                <Button variant="contained" color="success" onClick={sendContractData}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddNewTeam;
