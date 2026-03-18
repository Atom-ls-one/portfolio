import { auth } from './config';
import { onAuthStateChanged, type User } from 'firebase/auth';

class AuthStore {
	user = $state<User | null>(null);
	loading = $state(true);

	constructor() {
		if (typeof window !== 'undefined') {
			onAuthStateChanged(auth, (u) => {
				this.user = u;
				this.loading = false;
			});
		}
	}
}

export const adminAuth = new AuthStore();
