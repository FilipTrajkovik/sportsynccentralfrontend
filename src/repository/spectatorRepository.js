import axios from "axios";

const SpectatorRepository = {

    getAllSpectators: () => {
        return axios.get(`/spectator/all`);
    },
}

export default SpectatorRepository;