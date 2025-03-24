import { canvas, ctx } from "../scripts/utils/constants.js";
export default class Maps {
  constructor(
    { mapImage, mapSizeX, mapSizeY, mapStartX, mapStartY, characterSpeed },
    enemies
  ) {
    this._mapImage = mapImage;
    this._mapSizeX = mapSizeX;
    this._mapSizeY = mapSizeY;
    this._mapStartX = mapStartX;
    this._mapStartY = mapStartY;
    this._characterSpeed = characterSpeed;
    this._enemies = enemies;
    this.activeKeys = [];
    this.keysActive = false;
  }
  eventHandlers() {
    window.addEventListener("keydown", (event) => {
      if (!this.activeKeys.includes(event.key)) {
        this.activeKeys.push(event.key);
      }
      if (this.activeKeys.length > 0) {
        this.handleMovement();
      }

      document.dispatchEvent(
        new CustomEvent("enemyPositionUpdated", {
          detail: { ...this.position },
        })
      );
    });
    window.addEventListener("keyup", (event) => {
      // Remove the key from the array
      const index = this.activeKeys.indexOf(event.key);
      if (index > -1) {
        this.activeKeys.splice(index, 1);

        if (this.activeKeys.length > 0) {
          this.handleMovement();
        }
      }
    });
    this.startMovementLoop();
  }

  drawToCanvas() {
    canvas.style.backgroundImage = `url(${this._mapImage})`;
    canvas.style.backgroundSizeX = `${this._mapSizeX}px`;
    canvas.style.backgroundSizeY = `${this._mapSizeY}px`;
  }

  startMovementLoop() {
    const move = () => {
      this.handleMovement();
      this.movementLoop = requestAnimationFrame(move);
    };
    move();
  }

  handleMovement() {
    const currentX =
      parseInt(getComputedStyle(canvas).backgroundPositionX) || 0;
    const currentY =
      parseInt(getComputedStyle(canvas).backgroundPositionY) || 0;

    let moveX = 0;
    let moveY = 0;

    if (this.activeKeys.includes("w")) moveY += this._characterSpeed; // Up
    if (this.activeKeys.includes("s")) moveY -= this._characterSpeed; // Down
    if (this.activeKeys.includes("a")) moveX += this._characterSpeed; // Left
    if (this.activeKeys.includes("d")) moveX -= this._characterSpeed; // Right

    // Normalize for diagonal movement
    if (moveX !== 0 && moveY !== 0) {
      moveX /= Math.SQRT2;
      moveY /= Math.SQRT2;
    }

    canvas.style.backgroundPositionX = `${currentX + moveX}px`;
    canvas.style.backgroundPositionY = `${currentY + moveY}px`;
  }

  // update() {
  //   this.position = { x: 0, y: 0 };
  //   this.position.x = canvas.style.backgroundPositionX;
  //   this.position.y = canvas.style.backgroundPositionY;
  // }
}
