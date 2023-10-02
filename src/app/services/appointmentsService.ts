import axios from "axios";

const apiBaseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: apiBaseURL,
});

export async function getAppointments(
  size: number,
  before?: string,
  after?: string
) {
  try {
    const params = {
      size,
      ...(before && { before }),
      ...(after && { after }),
    };

    const response = await apiClient.get("/api/appointments", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
}

export async function getAppointmentByDate(date: string) {
  try {
    const params = {
      date,
    };
    const response = await apiClient.get("/api/availability", {params});
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
}
