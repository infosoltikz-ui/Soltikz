export const ADMIN_EMAILS = [
  'info.soltikz@gmail.com',
  'balajiprojects049@gmail.com',
]

export function isAuthorizedAdminEmail(email?: string | null): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.toLowerCase().trim())
}
