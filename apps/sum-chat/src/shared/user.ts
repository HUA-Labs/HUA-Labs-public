export function getOrCreateUserId(): string {
  if (typeof window === 'undefined') return '';
  let userId = localStorage.getItem('hua_user_id');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('hua_user_id', userId);
  }
  return userId;
} 