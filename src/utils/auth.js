export const getSession = () => localStorage.getItem("ticketapp_session");
export const setSession = (token) =>
  localStorage.setItem("ticketapp_session", token);
export const clearSession = () => localStorage.removeItem("ticketapp_session");
