import {ToastOptions} from 'ng6-toastr';

export class CustomOption extends ToastOptions {
  animate = 'fade'; // you can override any options available
  newestOnTop = false;
  showCloseButton = true;
  positionClass = 'toast-top-center';
  toastLife = 4000;
}
