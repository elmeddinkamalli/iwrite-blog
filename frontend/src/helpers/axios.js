import axios from "axios";
import { toast } from "react-toastify";
const $axios = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

$axios.interceptors.response.use(
  (response) => {
    if (response.status === 201) {
      toast.success(response.data.message);
      toast.clearWaitingQueue();
    } else if (
      response.config.method === "put" ||
      response.config.method === "patch"
    ) {
      toast.success("Updated Successfully!");
      toast.clearWaitingQueue();
    }
    return response;
  },
  (error) => {
    if (
      error.response.status === 400 ||
      error.response.status === 401 ||
      error.response.status === 403
    ) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }

    throw error;
  }
);

export default $axios;
