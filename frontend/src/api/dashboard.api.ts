

import api from "./axios";
import type { DashboardResponse } from "../types/dashboard.types";

export const getDashboard = async (): Promise<DashboardResponse> => {
  const response = await api.get<DashboardResponse>("/dashboard");

  return response.data;
};

