import api from "./axios";

export const getVideos = (params = {}) => api.get("/videos", { params });

export const createVideo = (formData) =>
  api.post("/videos", formData, { headers: { "Content-Type": "multipart/form-data" } });

export const updateVideo = (id, formData) =>
  api.put(`/videos/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });

export const deleteVideo = (id) => api.delete(`/videos/${id}`);
