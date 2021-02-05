export function validateLoginInput(loginInput) {
  if (!loginInput.username) {
    return 'Username can not be empty';
  } else if (!loginInput.password) {
    return 'Password can not be empty';
  }
  return '';
}
