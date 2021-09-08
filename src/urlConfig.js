const baseUrl = "https://flipkart-restapi-server.herokuapp.com:2000";

export const api = `${baseUrl}/api`;

export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};
