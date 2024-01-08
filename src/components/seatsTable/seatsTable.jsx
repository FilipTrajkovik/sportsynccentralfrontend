import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from "react-bootstrap";
import {useState} from "react";
import AddNewMatchModal from "../addNewMatch/addNewMatch";
import AddNewTicket from "../addNewTicket/addNewTicket";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#529898FF',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#73BDBDFF',
    },
    '&:nth-of-type(even)': {
        backgroundColor: '#BAECECFF',
    },
    '&:last-child td, &:last-child th': {
        border: 'none'
    },
}));

const SeatsTable = ({seatsAvailable}) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState({});

    const openAddModal = (seatId, matchId, sportHallId) => {
        setSelectedTicket({
            seatId: seatId,
            matchId: matchId,
            sportHallId: sportHallId
        });
        timeout(1000);
        setIsAddModalOpen(true);
    };

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 700}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Seat Sector</StyledTableCell>
                        <StyledTableCell align="center">Seat Row</StyledTableCell>
                        <StyledTableCell align="center">Seat Number</StyledTableCell>
                        <StyledTableCell align="center">#</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {seatsAvailable.map((seat) => (
                        <StyledTableRow key={seat.id}>
                            <StyledTableCell component="th" scope="row" align="center">
                                {seat.seatSector}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {seat.seatRow}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {seat.seatNumber}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Button style={{backgroundColor: '#529898FF', marginBottom: '10px', border: 'none'}}
                                        onClick={() => {openAddModal(seat.seatId, seat.matchId, seat.sportHallId)}}>
                                    Buy ticket
                                </Button>

                                <AddNewTicket seatId={selectedTicket.seatId}
                                              matchId={selectedTicket.matchId}
                                              sportHallId={selectedTicket.sportHallId}
                                              isOpen={isAddModalOpen}
                                              handleClose={closeAddModal}
                                              selectedMatch={seat}/>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SeatsTable;
