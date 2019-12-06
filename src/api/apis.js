import axios from "axios";

export const get = url => {
  const time = new Date().valueOf();
  if (url.indexOf("?") > -1) {
    url = url + "&time=" + time;
  } else {
    url = url + "?time=" + time;
  }
  return axios.get(url);
};
