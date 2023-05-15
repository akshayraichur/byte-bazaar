import axios from "axios";

export const getAPI = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then((response) => {
        if (response.statusText === "OK") {
          resolve(response.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
