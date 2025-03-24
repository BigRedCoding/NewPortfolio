export default class Obstacle {
  constructor(obstacles) {
    this._obstacleImage = obstacles.obstacleImage;
    this._obstacleSizeX = obstacles.obstacleSizeX;
    this._obstacleSizeY = obstacles.obstacleSizeY;
    this._obstacleStartX = obstacles.obstacleStartX;
    this._obstacleStartY = obstacles.obstacleStartY;
  }
  _draw() {
    ctx.drawImage(
      this._obstacleImage,
      this._obstacleSizeX,
      this._obstacleSizeY,
      this._obstacleStartX,
      this._obstacleStartY
    );
  }
}
