import axios from "axios";

const SpectatorAttedenceRepository = {

    getAllSpectators: () => {
        return axios.get("/spectator/all");
    },

    getAllSpectatorAttedences: () => {
        return axios.get("/spectator/allSpectatorAttendence");
    },

}

export default SpectatorAttedenceRepository;