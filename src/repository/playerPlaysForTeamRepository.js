import axios from "axios";

const PlayerPlaysForTeamRepository = {
    getAll: () => {
        return axios.get("/player-plays-for-team/all");
    },

    addNewTeam: (formDataMatch) => {
        return axios.post("/player-plays-for-team/playerChangeTeam", null, {
            params: {
                idTeam: formDataMatch.idTeam,
                idPlayer: formDataMatch.idPlayer,
                dateFrom: formDataMatch.dateFrom,
                dateTo: formDataMatch.dateTo
            }
        });
    },

}

export default PlayerPlaysForTeamRepository;