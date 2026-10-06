import api from "./axios";

export const getFrames = (category) =>
  api.get("/frames", { params: category && category !== "All" ? { category } : {} });

export const createFrame = (formData) =>
  api.post("/frames", formData, { headers: { "Content-Type": "multipart/form-data" } });

export const updateFrame = (id, formData) =>
  api.put(`/frames/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });

export const deleteFrame = (id) => api.delete(`/frames/${id}`);
