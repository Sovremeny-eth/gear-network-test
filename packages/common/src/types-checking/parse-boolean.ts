export function parseBoolean(
  value: string | undefined,
  defaultValue?: boolean,
): boolean | undefined {
  if (!value) {
    return defaultValue;
  }

  const val = value.trim().toLowerCase();

  if (val === 'disabled' || val === 'off' || val === '0' || val === 'false') {
    return false;
  }
  if (val === 'true' || val === '1' || val === 'on' || val === 'enabled') {
    return true;
  }

  return defaultValue;
}
