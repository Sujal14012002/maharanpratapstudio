import api from "./axios";

export const getPhotos = (category) =>
  api.get("/photos", { params: category && category !== "All" ? { category } : {} });

export const getPhotoCategories = () => api.get("/photos/categories");

export const createPhoto = (formData) =>
  api.post("/photos", formData, { headers: { "Content-Type": "multipart/form-data" } });

export const updatePhoto = (id, formData) =>
  api.put(`/photos/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });

export const deletePhoto = (id) => api.delete(`/photos/${id}`);
