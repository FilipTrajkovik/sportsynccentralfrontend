import axios from "axios";

const PlayerRepository = {
    getAll: () => {
        return axios.get("/player/all");
    },
}

export default PlayerRepository;