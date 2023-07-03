export const validationLogin = (userData, errors, setErrors) => {
  const newErrors = { ...errors };

  if (!userData.email) {
    newErrors.email = "Se requiere email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
    newErrors.email = "Formato invalido";
  } else if (userData.email.length > 35) {
    newErrors.email = "Email nombre de usurio no puede tener mas de 35";
  } else {
    newErrors.email = "";
  }

  if (!userData.password) {
    newErrors.password = "Ingrese contraseña";
  } else if (!/\d/.test(userData.password)) {
    newErrors.password = "la contraseña tiene que tener al menos un número";
  } else if (userData.password.length < 5 || userData.password.length > 11) {
    newErrors.password =
      "La contraseña tiene que tener una longitud entre 6 y 10 caracteres";
  } else {
    newErrors.password = "";
  }

  if (!userData.name) {
    newErrors.name = "Se requiere nombre";
  } else if (userData.name.length > 15) {
    newErrors.name = "El nombre no puede tener más de 15 caracteres";
  } else {
    newErrors.name = "";
  }
  setErrors(newErrors);
};
