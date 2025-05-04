export function isValidName(name: string): boolean {
  const validNamePattern = /^[A-Za-zÀ-ÿ\s]+$/;

  return validNamePattern.test(name) && name.length >= 2;
}
