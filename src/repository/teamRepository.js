import axios from "axios";

const TeamRepository = {

    getAllTeams: () => {
        return axios.get("/team/all")
    }
};

export default TeamRepository;