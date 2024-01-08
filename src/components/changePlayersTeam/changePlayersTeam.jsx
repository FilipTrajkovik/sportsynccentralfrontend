import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import './changePlayersTeam.css'
import PlayerPlaysForTeamRepository from "../../repository/playerPlaysForTeamRepository";
import AddNewMatchModal from "../addNewMatch/addNewMatch";
import AddNewTeam from "../addNewTeam/addNewTeam";


const ChangePlayersTeam = () => {
    const [players, setPlayers] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        PlayerPlaysForTeamRepository.getAll()
            .then((response) => {
                setPlayers(response.data)
            })
    }

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };


    return (
        <>
            <Container className={"mb-5 fragment-style mt-5"}>
                <Row>
                    <Col>
                        <Button onClick={openAddModal} className="btn btn-secondary btn-sm mt-3">
                            Add new contract
                        </Button>

                        <AddNewTeam isOpen={isAddModalOpen} handleClose={closeAddModal}/>
                        <Table className="mt-5 table table-light table-striped">
                            <thead className={"text-center table-header"}>
                            <tr>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Hometown</th>
                                <th>Date of birth</th>
                                <th>Position</th>
                                <th>Team name</th>
                                <th>Team hometown</th>
                                <th>Team trophies won</th>
                                <th>Founded</th>
                                <th>Playing from</th>
                                <th>Playing to</th>
                            </tr>
                            </thead>
                            <tbody className={"text-center"}>
                            {players.map((player) => (
                                <tr style={{verticalAlign: "middle"}} key={player.id}>
                                    <td>{player.player.name}</td>
                                    <td>{player.player.surname}</td>
                                    <td>{player.player.hometown}</td>
                                    <td>{player.player.dateOfBirth}</td>
                                    <td>{player.player.position}</td>
                                    <td>{player.team.name}</td>
                                    <td>{player.team.hometown}</td>
                                    <td>{player.team.trophiesWon}</td>
                                    <td>{player.team.founded}</td>
                                    <td>{player.dateFrom}</td>
                                    <td>{player.dateTo}</td>
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

export default ChangePlayersTeam;