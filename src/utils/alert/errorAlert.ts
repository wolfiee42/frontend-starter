// import Swal from "sweetalert2";

// TODO: please change from swal to react hot toast.
export const errorAlert = (message) => {
  Swal.fire({
    title: `${message}`,
    icon: "error",
    confirmButtonText: "OK",
    confirmButtonColor: "#ff0000",
  });
};
