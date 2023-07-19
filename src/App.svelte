<script lang="ts">
  import { onMount } from "svelte"
  import WordInput from "./components/WordInput.svelte"
  import type { WordData } from "./types"
  import { shuffleArray } from "./utils/shuffleArray"
  import { WORD_LIST } from "./words"

  let wordDataList: WordData[] = [];

  onMount(() => {
    const shuffledWords = shuffleArray(WORD_LIST.slice());
    wordDataList = shuffledWords.map(word => ({
      word: word,
      correctCount: 0,
      mistakeCount: 0
    }));
  });
</script>

<main
  class="flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-violet-300 to-violet-400"
>
  <div class="flex flex-col items-center w-full max-w-2xl p-8 bg-white gap-y-5 sm:rounded-lg">
    <div class="flex flex-col items-center">
      <h1 class="text-3xl font-semibold">Typing speed test</h1>
      <h2 class="text-lg font-medium text-gray-500"> Improve your typing skills </h2>
    </div>
    <WordInput wordDataList="{wordDataList}" />
  </div>
</main>
