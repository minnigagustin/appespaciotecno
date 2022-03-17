import axios from "axios";

const instance = axios.create({
  baseURL: `https://tecnotest.bahia.gob.ar/`,
});

export default instance;
