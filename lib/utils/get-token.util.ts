export function getToken(name?: string): string {
  return name ? `OcppToken_${name}` : 'OcppToken_default';
}
