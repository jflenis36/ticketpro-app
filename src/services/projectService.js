import api from './api'

export const getInformation = (projectId) => api.get(`/project/${projectId}`)