export const login = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const logout = () => {
  localStorage.clear();
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};