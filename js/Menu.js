export class Menu {
  constructor() {
    this.onJoin = () => console.log("join")
    this.menuEl = document.querySelector(".menu-container");
    this.form = document.querySelector(".menu");
    this.closeButton = document.querySelector(".close");
    this.nicknameInput = document.querySelector(".nickname");
    this.colorSelectorContainer = document.querySelector(".color-selector-container");
    this.gameOverFormEl = document.querySelector(".game-over");

    this.colors = [
      "#000000",
      "#c84f43",
      "#ffffff",
      "#b05cc6",
      "#cf427f",
      "#4baa91",
      "#d37d40",
      "#6f7dcb",
      "#ab9140",
      "#bf6d92"
    ]

    this.setup();
  }

  setColorSelector() {
    this.colorSelectorContainer.innerHTML = this.colors.map((color, index) => {
      return `
        <div class="color-selector" >
          <input type="radio" name="color" value="${color}" id="color-${index}" ${index === 0 && `checked`} />
          <label class="color-label" for="color-${index}" style="background-color: ${color}"></label>
        </div>
      `
    }).join("")
  }

  setup() {
    this.setColorSelector()

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.toggle();
      }
    })

    this.form.addEventListener("submit", (e) => {
      const nickname = this.nicknameInput.value;
      const color = this.colorSelectorContainer.querySelector("input:checked").value;

      e.preventDefault();
      this.onJoin({ nickname, color });
      this.toggle()
    })

    this.gameOverFormEl.addEventListener("submit", (e) => {
      e.preventDefault();
      this.hideGameOver();
      this.open();
    })

    this.closeButton.addEventListener("click", () => (this.close()))
  }

  close() {
    this.menuEl.classList.add("closed");
  }

  open() {
    this.menuEl.classList.remove("closed");
  }

  showGameOver() {
    this.gameOverFormEl.classList.add("show");
  }

  hideGameOver() {
    this.gameOverFormEl.classList.remove("show");
  }

  toggle() {
    this.menuEl.classList.toggle("closed");
  }
}