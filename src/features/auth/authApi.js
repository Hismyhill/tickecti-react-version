// small wrapper to call mock server auth routes

import api from "../../services/api";

export async function loginApi({ email, password }) {
  // JSON server can't easily do auth, but we simulate by searching users
  const users = await api.request(`/users?email=${encodeURIComponent(email)}`);
  const user = users && users[0];
  if (!user) {
    const e = new Error("Invalid credentials");
    e.status = 401;
    throw e;
  }
  // simple password check (mock): password stored in user.password
  if (user.password !== password) {
    const e = new Error("Invalid credentials");
    e.status = 401;
    throw e;
  }
  // return token + user
  return { token: `fake-jwt-token-${user.id}`, user };
}

export async function signupApi({ name, email, password }) {
  // create user on json-server
  const created = await api.request("/users", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  return { token: `fake-jwt-token-${created.id}`, user: created };
}
