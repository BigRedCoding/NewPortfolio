//import { itemTypes } from "../utils/constants.js";
class Item {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = 20; // Fixed size
    this.height = 20;
    this.type = type; // Determines the item's effect
    this.image = new Image();
    this.image.src = "./images/raven.png"; // `./images/items/${type}.png`; // Load the sprite image based on type
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  applyEffect(player) {
    switch (this.type) {
      case "gold":
        player.stats.gold += 50; // Add gold
        console.log("Gold collected! Current gold:", player.stats.gold);
        break;
      case "heal":
        player.heal(20); // Heal the player
        console.log("Healed for 20 HP!");
        break;
      case "fire-rate":
        cooldownTime = Math.max(200, cooldownTime - 100); // Increase fire rate
        console.log("Fire rate increased!");
        break;
      case "speed":
        player.stats.speed += 1; // Increase movement speed
        console.log("Speed increased!");
        break;
      default:
        console.log("Unknown item effect.");
    }
  }
}
