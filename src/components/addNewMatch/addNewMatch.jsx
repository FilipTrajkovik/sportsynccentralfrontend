import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import TeamRepository from '../../repository/teamRepository';
import SportHallRepository from '../../repository/sportHallRepository';
import MatchRepository from '../../repository/matchRepository';
import { useNavigate } from 'react-router-dom';
import {Container} from "react-bootstrap";

import { Modal } from 'react-bootstrap';

const AddNewMatch = ({ isOpen, handleClose }) => {
    const navigate = useNavigate();

    const [teams, setTeams] = useState([]);
    const [sportHalls, setSportHalls] = useState([]);

    const [formDataMatch, setFormDataMatch] = useState({
        name: '',
        category: '',
        sportType: '',
        matchDate: null,
        startTime: null,
        endTime: null,
        idHomeTeam: null,
        idGuestTeam: null,
        idSportHall: null,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        TeamRepository.getAllTeams().then((response) => {
            setTeams(response.data);
        });

        SportHallRepository.getAllSportHalls().then((response) => {
            setSportHalls(response.data);
        });
    };

    const handleChange = (e) => {
        setFormDataMatch({
            ...formDataMatch,
            [e.target.name]: e.target.value,
        });
    };

    const handleTimeChange = (field, time) => {
        setFormDataMatch({
            ...formDataMatch,
            [field]: time,
        });
    };

    const sendMatchData = () => {
        if (
            formDataMatch.name === '' ||
            formDataMatch.category === '' ||
            formDataMatch.sportType === '' ||
            formDataMatch.matchDate == null ||
            formDataMatch.startTime == null ||
            formDataMatch.endTime == null ||
            formDataMatch.idHomeTeam == null ||
            formDataMatch.idGuestTeam == null ||
            formDataMatch.idSportHall == null
        ) {
        } else {
            MatchRepository.addNewMatch(formDataMatch).then(() => {
                navigate('/match');
                window.location.reload();
                handleClose();
                alert("Match " + formDataMatch.name + "has been added successfully");
            });
            setFormDataMatch({
                name: '',
                category: '',
                sportType: '',
                matchDate: null,
                startTime: null,
                endTime: null,
                idHomeTeam: null,
                idGuestTeam: null,
                idSportHall: null,
            });
        }
    };

    return (
        <Modal show={isOpen} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Match</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className={"pb-3 px-auto bg-light"}>
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <FormControl style={{ width: 100 + "%" }} margin={"auto"}>
                                <TextField
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    name={"name"}
                                    margin={"normal"}
                                    onChange={handleChange}
                                    value={formDataMatch.name}
                                    type={"text"}
                                    required={true}
                                />
                            </FormControl>
                        </div>

                        <div className={"col-6"}>
                            <FormControl style={{ width: 100 + "%" }} margin={"normal"}>
                                <InputLabel id="demo-simple-select-label">
                                    Sport Halls
                                </InputLabel>

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Sport Halls"
                                    onChange={handleChange}
                                    name={"idSportHall"}
                                    value={formDataMatch.idSportHall}
                                    required={true}
                                >
                                    {sportHalls.map((element) => (
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
                            <FormControl style={{ width: 100 + "%" }}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Category"
                                    variant="outlined"
                                    name={"category"}
                                    margin={"normal"}
                                    onChange={handleChange}
                                    value={formDataMatch.category}
                                    type={"text"}
                                    required={true}
                                />
                            </FormControl>
                        </div>


                        <div className={"col-6"}>
                            <FormControl style={{ width: 100 + "%" }}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Sport type"
                                    variant="outlined"
                                    name={"sportType"}
                                    margin={"normal"}
                                    onChange={handleChange}
                                    value={formDataMatch.sportType}
                                    type={"text"}
                                    required={true}
                                />
                            </FormControl>
                        </div>

                        <div className={"col-6"}>
                            <FormControl style={{ width: 100 + "%" }} margin={"normal"}>
                                <InputLabel id="demo-simple-select-label">
                                    Choose host team
                                </InputLabel>

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Host team"
                                    onChange={handleChange}
                                    name={"idHomeTeam"}
                                    value={formDataMatch.idHomeTeam}
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
                                    Choose guest team
                                </InputLabel>

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Guest team"
                                    onChange={handleChange}
                                    name={"idGuestTeam"}
                                    value={formDataMatch.idGuestTeam}
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

                        <div className={"col-4"}>
                            <FormControl style={{ width: 100 + "%" }}>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    name={"matchDate"}
                                    margin={"normal"}
                                    onChange={handleChange}
                                    value={formDataMatch.matchDate}
                                    type={"date"}
                                    required={true}
                                />
                            </FormControl>
                        </div>


                        <div className={"col-4"}>
                            <FormControl style={{ width: 100 + "%" }}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="startTime"
                                    margin="normal"
                                    type="time"
                                    onChange={(e) => handleTimeChange("startTime", e.target.value)}
                                    value={formDataMatch.startTime || ""}
                                    required
                                />
                            </FormControl>
                        </div>


                        <div className={"col-4"}>
                            <FormControl style={{ width: 100 + "%" }}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="endTime"
                                    margin="normal"
                                    type="time"
                                    onChange={(e) => handleTimeChange("endTime", e.target.value)}
                                    value={formDataMatch.endTime || ""}
                                    required
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
                <Button variant="contained" color="success" onClick={sendMatchData}>
                    Add Match
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddNewMatch;
