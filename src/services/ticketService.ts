import api from './api'

export const createTicket = (data) => api.post('ticket', data);

export const getTicketById = (id) => api.get(`ticket/${id}`);

export const updateTicket = (id, data) => api.put(`ticket/${id}`, data);

export const getAllTickets = () => api.get('ticket')