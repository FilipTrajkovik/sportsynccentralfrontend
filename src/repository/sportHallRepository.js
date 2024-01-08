import axios from "axios";

const SportHallRepository = {

    getAllSportHalls: () => {
        return axios.get("/sport-hall/all")
    }
};

export default SportHallRepository;