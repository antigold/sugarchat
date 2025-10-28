import { writable } from 'svelte/store';
export type Page = 'roomList' | 'chatRoom' | 'login';

export const currentPage = writable<Page>('login');
export const currentChat = writable<string | null>(null);

export function showPage(p: Page, extra?: string) {
  currentPage.set(p);
  if (p === 'chatRoom' && extra) {
    currentChat.set(extra); // uuid
  } else {
    currentChat.set(null);
  }
}