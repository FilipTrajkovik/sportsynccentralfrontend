import axios from "axios";

const MatchRepository = {

    getAllMatches: () => {
        return axios.get("/match/all");
    },

    getMatch: (id) => {
        return axios.get(`/match/${id}`);
    },

    getAllMatchesWithCapacity: () => {
        return axios.get("/match/allMatchesWithCapacity");
    },

    getAllMatchWithGuestTeamsAndPlayersView: () => {
        return axios.get("/match/allMatchWithGuestTeamsAndPlayers");
    },

    getAllMatchWithHostTeamsAndPlayersView: () => {
        return axios.get("/match/allMatchWithHostTeamsAndPlayers");
    },

    getAllMatchWithTeamsView: () => {
        return axios.get("/match/allMatchWithTeams");
    },

    addNewMatch: (formDataMatch) => {
        return axios.post("/match/add", null, {
            params: {
                name: formDataMatch.name,
                category: formDataMatch.category,
                sportType: formDataMatch.sportType,
                matchDate: formDataMatch.matchDate,
                startTime: formDataMatch.startTime,
                endTime: formDataMatch.endTime,
                idHomeTeam: formDataMatch.idHomeTeam,
                idGuestTeam: formDataMatch.idGuestTeam,
                idSportHall: formDataMatch.idSportHall
            }
        });
    }
}

export default MatchRepository;