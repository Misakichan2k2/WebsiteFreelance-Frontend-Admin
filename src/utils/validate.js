export const VALIDATE = {
  onValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  onValidPassword: (password) => {
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z]).{6,}$/;
    return regex.test(password);
  },
};
