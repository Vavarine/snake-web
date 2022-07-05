export class Score {
  constructor(playerId) {
    this.playerId = playerId;

    this.scoreEl = document.querySelector(".score");
    this.leaderboardEl = document.createElement("div");
    this.leaderboardEl.classList.add("leaderboard");

    document.querySelector("main").appendChild(this.leaderboardEl);
  }

  update(snakes) {
    this.snakes = snakes

    const playerSnake = this.snakes.find(snake => snake.id === this.playerId);
    const sortedSnakes = this.snakes.sort((a, b) => b.body.length - a.body.length);

    this.leaderboardEl.innerHTML = sortedSnakes.map((snake, index) => {
      const { nickname, color } = snake;

      return `
        <div class="leaderboard-item" style="color: ${color}">#${index + 1} ${nickname}</div>
      `
    }).join("")

    if (playerSnake) {
      const score = (playerSnake.body.length - 5) * 100;
      console.log(score)

      this.scoreEl.innerHTML = score;
    }
  }
}    