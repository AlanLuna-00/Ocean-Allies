import Swal from "sweetalert2";

//* ------------------- SWEETALERT ------------------------
const showSuccess = () => {
  Swal.fire({
    icon: "success",
    title: "Excellent !",
  });
};

const showError = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
  });
};

// envio de mensaje en Contact-------
const showSuccessMessage = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Message sent succesfully",
    showConfirmButton: false,
    timer: 1500,
  });
};

const showErrorMessage = () => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Message fail",
    showConfirmButton: false,
    timer: 1500,
  });
};

const showAddToCart = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Added to cart 🛒",
    showConfirmButton: false,
    timer: 1500,
  });
};

const showRemoveFromCart = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Removed from cart 🛒",
    showConfirmButton: false,
    timer: 1500,
  });
};

const showErrorNotLogged = () => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "You must be logged in to add to cart",
    showConfirmButton: false,
    timer: 1500,
  });
};

const showErrorNotSelectedSize = () => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "You must select a size",
    showConfirmButton: false,
    timer: 1500,
  });
};

const showSuccessRegister = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Registered successfully",
    showConfirmButton: false,
    timer: 1500,
  });
};

const showErrorRegister = () => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Error registering",
    showConfirmButton: false,
    timer: 1500,
  });
};
// envio de mensaje en Contact ^^^^^^
//* ------------------- SWEETALERT ------------------------

export {
  showSuccess,
  showError,
  showErrorMessage,
  showSuccessMessage,
  showAddToCart,
  showRemoveFromCart,
  showErrorNotLogged,
  showErrorNotSelectedSize,
  showSuccessRegister,
  showErrorRegister,
};
