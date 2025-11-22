const axios = require("axios");

const jenkins = axios.create({
  baseURL: process.env.JENKINS_URL,
  auth: {
    username: process.env.JENKINS_USER,
    password: process.env.JENKINS_TOKEN,
  }
});

// Add CSRF crumb for POST requests
jenkins.interceptors.request.use(async (config) => {

  if (config.method === "post") {
    const crumbData = await axios.get(
      `${process.env.JENKINS_URL}/crumbIssuer/api/json`,
      {
        auth: {
          username: process.env.JENKINS_USER,
          password: process.env.JENKINS_TOKEN,
        }
      }
    );

    config.headers[crumbData.data.crumbRequestField] = crumbData.data.crumb;
  }

  return config;
});

module.exports = jenkins;
