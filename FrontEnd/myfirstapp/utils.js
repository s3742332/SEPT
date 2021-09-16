import axios from "axios";

export const BASE_URL = "http://localhost:8080"

// export const editApprovedProfile = async () => {
//     try {
//         return await axios.post('${BASE_URL}/api/users/updateApproved/', user, config);
//     } catch (e) {
//         return [];
//     }
// }

export const fetchPendingSellers = async () => {
    try {
        return await axios.get('${BASE_URL}/api/users/getAllPendingBusiness/');
    } catch (e) {
        return [];
    }
};

export const fetchApprovedUsers = async () => {
    try {
        return await axios.get('${BASE_URL}/api/users/getAllApprovedUsers/');
    } catch (e) {
        return [];
    }
};

