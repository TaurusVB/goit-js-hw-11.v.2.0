export default class LoadingButton {
  constructor({ selector, isHidden = false }) {
    this.btn = document.querySelector(`.${selector}`);
    isHidden && this.hidden()
  }

  btnDisabled() {
    this.btn.disabled = true;
    this.btn.textContent = 'Loading...';
  }

  btnEnabled() {
    this.btn.disabled = false;
    this.btn.textContent = 'Load more';
  }

  hidden() {
    this.btn.classList.add("hidden");
  }

  show() {
    this.btn.classList.remove("hidden");
  }
}
