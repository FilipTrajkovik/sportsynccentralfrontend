import axios from "axios";

const TicketRepository = {
    addNewTicket: (formDataMatch, seatId, matchId, sportHallId) => {
        console.log(formDataMatch)
        return axios.post("/ticket/add", null, {
            params: {
                price: formDataMatch.price,
                locationBought: formDataMatch.locationBought,
                idMatch: matchId,
                idSpectator: formDataMatch.idSpectator,
                idSeat: seatId,
                idSportHall: sportHallId,
            }
        });
    }
}

export default TicketRepository