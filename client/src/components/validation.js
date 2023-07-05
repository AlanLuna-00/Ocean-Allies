export const validation = (userData, errors, setErrors) => {
  const newErrors = { ...errors };

  if (!userData.user_name) {
    newErrors.user_name = "Enter a name";
  } else if (userData.user_name.length < 1 || userData.user_name.length > 21) {
    newErrors.user_name = "The name must have between 1 and 20 characters";
  } else {
    newErrors.user_name = "";
  }

  if (!userData.user_email) {
    newErrors.user_email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.user_email)) {
    newErrors.user_email = "Invalid email format";
  } else if (userData.user_email.length > 35) {
    newErrors.user_email = "Email cannot be longer than 35 characters";
  } else {
    newErrors.user_email = "";
  }

  if (!userData.message) {
    newErrors.message = "Enter the message";
  } else if (userData.message.length < 1 || userData.message.length > 141) {
    newErrors.message = "The message must be between 1 and 140 characters";
  } else {
    newErrors.message = "";
  }

  setErrors(newErrors);
};


