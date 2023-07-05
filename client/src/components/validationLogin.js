export const validationLogin = (userData, errors, setErrors) => {
  const newErrors = { ...errors };

  if (!userData.email) {
    newErrors.email = "email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
    newErrors.email = "invalid format";
  } else if (userData.email.length > 35) {
    newErrors.email = "Email username cannot be longer than 35 characters ";
  } else {
    newErrors.email = "";
  }

  if (!userData.password) {
    newErrors.password = "insert password";
  } else if (userData.password.length < 5 || userData.password.length > 11) {
    newErrors.password = "Password must be between 5 and 11 characters";
  } else {
    newErrors.password = "";
  }

  if (!userData.name) {
    newErrors.name = "name is required";
  } else if (userData.name.length > 15) {
    newErrors.name = "name cannot be longer than 15 characters";
  } else {
    newErrors.name = "";
  }
  setErrors(newErrors);
};
