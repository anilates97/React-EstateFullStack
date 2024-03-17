import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "https://react-estate-full-stack-server.vercel.app/api",
});

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allresd", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const getProperty = async (id: string) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const createUser = async (email: string) => {
  try {
    await api.post(
      `/user/register`,
      { email },
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

export const bookVisit = async (
  date: Date,
  propertId?: string,
  email?: string,
  token?: string
) => {
  try {
    await api.post(
      `/user/bookVisit/${propertId}`,
      {
        email,
        id: propertId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error(
      "Something went wrong while visiting booking, Please try again"
    );
    throw error;
  }
};

export const removeBooking = async (
  id: string,
  email?: string,
  token?: string
) => {
  try {
    await api.post(
      `/user/removeBooking/${id}`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error(
      "Something went wrong while cancelling booking, Please try again"
    );
    throw error;
  }
};

export const toFav = async (id: string, email: string, token: string) => {
  try {
    await api.post(
      `/user/myFavourites/${id}`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error(
      "Something went wrong while adding to favourites, Please try again"
    );
    throw error;
  }
};

export const getAllFav = async (email?: string, token?: string) => {
  if (!token) return;

  try {
    const res = await api.post(
      `/user/allFav/`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data["favResidenciesID"];
  } catch (error) {
    toast.error(
      "Something went wrong while fetching all favourites, Please try again"
    );
    throw error;
  }
};

export const getAllBookings = async (email?: string, token?: string) => {
  if (!token) return;

  try {
    const res = await api.post(
      `/user/allBookings/`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data["bookedVisits"];
  } catch (error) {
    toast.error(
      "Something went wrong while fetching bookings, Please try again"
    );
    throw error;
  }
};

export const createResidency = async (data: any, token: string) => {
  try {
    await api.post(
      `/residency/create/`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error(
      "Something went wrong while creating residency, Please try again"
    );
    throw error;
  }
};
