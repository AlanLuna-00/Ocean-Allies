export const validation = (userData, errors, setErrors) => {
    const newErrors = { ...errors };

    if (!userData.user_name) {
      newErrors.user_name = "Ingrese un nombre";
    } else if (userData.user_name.length < 1 || userData.user_name.length > 21) {
      newErrors.user_name = "El nombre debe tener entre 1 y 20 caracteres";
    } else {
      newErrors.user_name = "";
    }

    if (!userData.user_email) {
      newErrors.user_email = "Se requiere un correo electrónico";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.user_email)) {
      newErrors.user_email = "Formato de correo electrónico inválido";
    } else if (userData.user_email.length > 35) {
      newErrors.user_email = "El correo electrónico no puede tener más de 35 caracteres";
    } else {
      newErrors.user_email = "";
    }

    if (!userData.message) {
      newErrors.message = "Ingrese el mensaje";
    } else if (userData.message.length < 1 || userData.message.length > 141) {
      newErrors.message = "El mensaje debe tener entre 1 y 140 caracteres";
    } else {
      newErrors.message = "";
    }

    setErrors(newErrors);
  };


