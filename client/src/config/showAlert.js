import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

//? Base config to alert
const showAlert = withReactContent(Swal);

//? Config to display a toast
const toast = showAlert.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        console.log(toast, { ...Swal });
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

export default showAlert;
export {
    toast
}