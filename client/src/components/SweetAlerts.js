import Swal from "sweetalert2";

//* ------------------- SWEETALERT ------------------------
const showSuccess = () => {
  Swal.fire({
    icon: 'success',
    title: 'Excellent !',
  });
}

const showError = () => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
  })
}

// envio de mensaje en Contact-------
const showSuccessMessage = () => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Message sent succesfully',
    showConfirmButton: false,
    timer: 1500
  });
}

const showErrorMessage = () => {
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: 'Message fail',
    showConfirmButton: false,
    timer: 1500
  })
}
// envio de mensaje en Contact ^^^^^^
//* ------------------- SWEETALERT ------------------------

export { showSuccess, showError, showErrorMessage, showSuccessMessage };