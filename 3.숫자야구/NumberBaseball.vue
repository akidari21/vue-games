<template>
  <div>
    <h1>{{ result }}</h1>
    <form @submit.prevent="onSubmitForm">
      <input ref="answer" minlength="4" maxlength="4" v-model="value" />
      <button>입력</button>
    </form>
    <div>시도: {{ tries.length }}</div>
    <ul>
      <li v-for="t in tries" :key="t">
        <p>{{ t.try }}</p>
        <p>{{ t.result }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), i)[0];
    array.push(chosen);
  }
};
export default {
  data() {
    return {
      answer: getNumbers(),
      tries: [],
      value: "",
      result: "",
    };
  },
  methods: {
    onSubmitForm() {
      // 정답이면  .. 문자열&배열 비교시 join 사용)
      if (this.value === this.answer.join("")) {
        this.tries.push({
          try: this.value,
          result: "홈런",
        });
        this.result = "홈런";
        this.value = "";
        this.tries = [];
        this.$refs.answer.focus();
      } else {
      }
      this.value = "";
      this.$refs.answer.focus();
    },
  },
};
</script>

<style></style>
