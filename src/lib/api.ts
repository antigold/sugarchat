import axios from "axios";
import { token, user } from "../stores/auth";

const API = "http://127.0.0.1:1300"; // your backend

export async function verifySavedLogin() {
  const savedToken = localStorage.getItem("authToken"); //get token
  if (!savedToken) return false;//no token return

  try {
    const res = await axios.get(`${API}/users/me`, {
      headers: { Authorization: `Bearer ${savedToken}` }
    });
    token.set(savedToken);
    user.set(res.data);
    return true;
  } catch {
    return false;
  }
}

export async function login(username: string, password: string) {
  try {
    const res = await axios.post(`${API}/users/login`, { username, password });
    token.set(res.data.token);
    localStorage.setItem("authToken", res.data.token);

    // fetch current user
    const userRes = await axios.get(`${API}/users/me`, {
      headers: { Authorization: `Bearer ${res.data.token}` }
    });
    user.set(userRes.data);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function register(username: string, password: string) {
  try {
    const res = await axios.post(`${API}/users/register`, { username, password });
    token.set(res.data.token);

    const userRes = await axios.get(`${API}/users/me`, {
      headers: { Authorization: `Bearer ${res.data.token}` }
    });
    user.set(userRes.data);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
