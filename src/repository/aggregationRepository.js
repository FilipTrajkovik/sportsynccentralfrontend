import axios from "axios";

const AggregationRepository = {
    getSpectatorWithMostTicketsForLastYear: () => {
        return axios.get("/spectator/spectatorWithMostTicketsForLastYear");
    },

    getFutureMatchesRemainingCapacity: () => {
        return axios.get("/match/getFutureMatchesRemainingCapacity");
    },

    getPlayersMatchesPlayedWithAttendence: () => {
        return axios.get("/player/getPlayersMatchesPlayedWithAttendence");
    },
}

export default AggregationRepository;