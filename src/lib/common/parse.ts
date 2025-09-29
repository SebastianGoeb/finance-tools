export function parseGermanNumber(value: string): number {
  return parseLocalizedNumber(value, {group: '.', decimal: ','});
}

export function parseLocalizedNumber(value: string, {group = ',', decimal = '.'} = {}): number {
  let sanitizedValue = value
    .replace(group, '')
    .replace(decimal, '.');
  return parseFloat(sanitizedValue);
}

// minimal parser to avoid pulling in a multi-KB library
export function parseGermanDate(value: string): Date {
  const match = value.match(/(\d{2})\.(\d{2})\.(\d{4})/)
  if (!match) {
    throw new Error("invalid date format: " + value);
  }

  let iso = `${match[3]}-${match[2]}-${match[1]}`;
  return new Date(iso)
}
