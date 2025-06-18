export function getOptionsToken(name?: string): string {
  return name ? `OcppOptions_${name}` : 'OcppOptions_default';
}
