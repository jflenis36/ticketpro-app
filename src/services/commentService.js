import api from './api'

export const getComments = (ticketId) => api.get(`/ticket/${ticketId}/comments`)
export const addComment = (ticketId, data) => api.post(`/ticket/${ticketId}/comments`, data)

export const getReplies = (commentId) => api.get(`/comment/${commentId}`)
export const postReply = (commentId, data) => api.post(`/comment/${commentId}/reply`, data)