import { writable } from 'svelte/store';
export type Page = 'roomList' | 'chatRoom';

export const currentPage = writable<Page>('roomList');
export const currentChat = writable<string | null>(null);

export function showPage(p: Page, extra?: string) {
  currentPage.set(p);
  if (p === 'chatRoom' && extra) {
    currentChat.set(extra); // uuid
  } else {
    currentChat.set(null);
  }
}