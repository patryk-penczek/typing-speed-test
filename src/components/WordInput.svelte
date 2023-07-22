<script lang="ts">
  import { onMount } from "svelte"
  import type { HandleInputResult, WordData } from "../types"
  import { handleInput } from "../utils/handleInput"
  import { shuffleArray } from "../utils/shuffleArray"
  import { WORD_LIST } from "../words"
  import TypingResult from "./TypingResult.svelte"

  export let wordDataList: WordData[] = [];
  let typedInput: string = "";
  let currentWordIndex: number = 0;
  let startTime: Date | undefined;
  let wordsPerMinute: number = 0;
  let charactersPerMinute: number = 0;

  function updateSpeedMetrics(): void {
    if (!startTime) return;
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime.getTime();
    const minutes = elapsedTime / 60000;
    wordsPerMinute = (currentWordIndex + 1) / minutes;
    charactersPerMinute =
      wordDataList.reduce((sum, data) => sum + data.correctCount, 0) / minutes;
  }

  const interval = setInterval(updateSpeedMetrics, 1000);
  onMount(() => {
    const shuffledWords = shuffleArray(WORD_LIST.slice());
    wordDataList = shuffledWords.map((word) => ({
      word: word,
      correctCount: 0,
      mistakeCount: 0
    }));
  });

  function handleInputWrapper(event: Event): void {
    const result: HandleInputResult = handleInput(
      event,
      wordDataList,
      typedInput,
      currentWordIndex,
      startTime,
      wordsPerMinute,
      charactersPerMinute
    );

    wordDataList = result.wordDataList;
    typedInput = result.typedInput;
    currentWordIndex = result.currentWordIndex;
    startTime = result.startTime;
    wordsPerMinute = result.wordsPerMinute;
    charactersPerMinute = result.charactersPerMinute;
  }
</script>

<div class="flex flex-col w-full gap-y-5 sm:rounded-lg">
  <div class="flex justify-around w-full">
    <div class="font-medium sm:text-lg">
      <p>WPM: {wordsPerMinute.toFixed(2)}</p>
    </div>
    <div class="font-medium sm:text-lg">
      <p>CPM: {charactersPerMinute.toFixed(2)}</p>
    </div>
  </div>
  <input
    class="w-full p-2 rounded-lg outline outline-1"
    bind:value="{typedInput}"
    on:input="{handleInputWrapper}"
  />
  <TypingResult wordDataList="{wordDataList}" />
</div>
