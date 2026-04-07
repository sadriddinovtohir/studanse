export function getRoleFromToken(token) {
  const payload = token.split(".")[1];
  const decoded = JSON.parse(atob(payload));
  return decoded.role;
}
