import { writable } from "svelte/store";

const saved = localStorage.getItem("domain") || "http://localhost:3000";
export const domain = writable(saved);

domain.subscribe((d) => {
  localStorage.setItem("domain", d);
});