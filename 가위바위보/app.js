new Vue({
  el: "#app",
  data: {
    myChoice: null,
    comChoice: null,
    count: null,
    winner: "",
    lifeMe: 3,
    lifeCom: 3,
    isActive: true,
    progress: false,
    result: null,
    logs: [],
    hands: [
      { name: "가위", value: "sissor" },
      { name: "바위", value: "rock" },
      { name: "보", value: "paper" },
    ],
  },
  computed: {
    // v-if 을 안 쓰ㅗ 여기서 처리
    myChoiceImg: function () {
      if (this.myChoice !== null) {
        return `images/${this.myChoice}.png`;
      }
    },
    comChoiceImg: function () {
      if (this.comChoice !== null) {
        return `images/${this.comChoice}.png`;
      }
    },
  },
  watch: {
    count: function (newVal) {
      if (newVal === 0) {
        const comHand =
          this.hands[Math.floor(Math.random() * this.hands.length)];
        this.comChoice = comHand.value;

        // 승패
        if (this.comChoice == this.myChoice) {
          this.winner = "no one";
        } else if (this.comChoice == "rock" && this.myChoice == "paper") {
          this.winner = "me";
        } else if (this.comChoice == "rock" && this.myChoice == "sissor") {
          this.winner = "com";
        } else if (this.comChoice == "paper" && this.myChoice == "sissor") {
          this.winner = "me";
        } else if (this.comChoice == "paper" && this.myChoice == "rock") {
          this.winner = "com";
        } else if (this.comChoice == "sissor" && this.myChoice == "rock") {
          this.winner = "me";
        } else if (this.comChoice == "sissor" && this.myChoice == "paper") {
          this.winner = "com";
        } else {
          this.winner = null;
        }

        // 차감
        if (this.winner === "me") {
          this.lifeCom--;
          if (this.lifeCom === 0) {
            // alert("당신의 승리!");
            setTimeout(() => {
              this.result = "me";
            }, 1000);
          }
        } else if (this.winner === "com") {
          this.lifeMe--;
          if (this.lifeMe === 0) {
            // alert("컴퓨터의 승리!");
            setTimeout(() => {
              this.result = "com";
            }, 1000);
          }
        }
        this.isActive = true;

        // 승패 기록
        // let myChoose = this.myChoice === 'sissor' ? '가위';
        // myChoose = this.myChoice === 'rock' ? '바위';
        // myChoose = this.myChoice === 'paper' ? '보';
        let log = {
          message: `You: ${this.myChoice}, Computer: ${this.comChoice}`,
          winner: this.winner,
        };
        this.logs.push(log);
        console.log(this.logs);
      }
    },
  },
  methods: {
    startGame() {
      if (this.myChoice === null) {
        alert("선택하세요!");
      } else {
        this.isActive = false;
        this.count = 3;
        this.winner = "";
        this.progress = true;
        let countDown = setInterval(() => {
          this.count--;
          if (this.count === 0) {
            clearInterval(countDown);
            this.progress = false;
          }
        }, 500);
      }
    },
    restart() {
      this.myChoice = null;
      this.comChoice = null;
      this.count = null;
      this.winner = "";
      this.lifeMe = 3;
      this.lifeCom = 3;
      this.progress = false;
      this.result = null;
      this.logs = [];
    },
  },
});
