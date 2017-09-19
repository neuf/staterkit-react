// Import Libraries
const axios = require('axios');

const api = {
  /* GET PROJECTS - DATAS FROM FOLDER*/
  getProjects: () => {
    return new Promise((resolve, reject) => {
      const response = require("../datas/projects.json");
      resolve(response);
    });
  }

  /* GET PROJECTS - DATAS FROM SERVER */
  /*getProjects: () => {
    return axios.get("../datas/projects.json")
  }*/


};

export default api;
