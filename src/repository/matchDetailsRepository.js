import axios from "axios";

const MatchDetailsRepository = {

    getHomeTeamPlayers: (matchId) => {
        return axios.get(`/match/homeTeamPlayers/${matchId}`);
    },

    getGuestTeamPlayers: (matchId) => {
        return axios.get(`/match/guestTeamPlayers/${matchId}`);
    },

    getSeatsAvailableForMatch: (matchId) => {
        return axios.get(`/match/seatsAvailableForMatch/${matchId}`);
    },

}

export default MatchDetailsRepository;