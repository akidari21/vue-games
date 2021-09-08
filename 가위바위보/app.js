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
    logWinner: function () {
      // computed 에 부득이하게 파라메터를 받을 경우
      return (item) => {
        if (item === "com") return "컴퓨터 승!";
        else if (item === "me") return "나의 승!";
        else return "무승부";
      };
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

        // 하트 차감
        if (this.winner === "me") {
          this.lifeCom--;
          if (this.lifeCom === 0) {
            setTimeout(() => {
              this.result = "me";
            }, 1000);
          }
        } else if (this.winner === "com") {
          this.lifeMe--;
          if (this.lifeMe === 0) {
            setTimeout(() => {
              this.result = "com";
            }, 1000);
          }
        }
        this.isActive = true;

        // 승패 기록
        let myChoose = this.hands.filter(
          (hand) => hand.value === this.myChoice
        );
        let comChoose = this.hands.filter(
          (hand) => hand.value === this.comChoice
        );
        // console.log(myChoose[0].name, comChoose[0].name);

        let log = {
          message: {
            me: myChoose[0].name,
            com: comChoose[0].name,
          },
          // `You: ${this.myChoice}, Computer: ${this.comChoice}`,
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
