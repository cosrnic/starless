import { writable } from 'svelte/store';

type Notification = {
	message: string;
	type: 'error' | 'copy';
};

export const notifications = writable<Notification[]>([]);

export function toast(message: string, type: 'error' | 'copy') {
	notifications.update((state) => [{ message, type }, ...state]);
	setTimeout(removeToast, 2000);
}

function removeToast() {
	notifications.update((state) => {
		return [...state.slice(0, state.length - 1)];
	});
}
