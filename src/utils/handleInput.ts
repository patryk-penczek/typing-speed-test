import type { HandleInputResult, WordData } from "../types"

export function handleInput(
  event: Event,
  wordDataList: WordData[],
  typedInput: string,
  currentWordIndex: number,
  startTime: Date | undefined,
  wordsPerMinute: number,
  charactersPerMinute: number,
): HandleInputResult {
  if (!startTime) startTime = new Date()
  const currentWordData = wordDataList[currentWordIndex]
  if (!currentWordData) return {} as HandleInputResult

  const typedValue = (event.target as HTMLInputElement).value

  if (typedValue.endsWith(" ")) {
    if (typedValue.slice(0, -1) === currentWordData.word) {
      currentWordIndex++
      typedInput = ""
    } else {
      currentWordData.mistakeCount++
    }
  } else {
    currentWordData.correctCount = 0
    currentWordData.mistakeCount = 0
    for (let i = 0; i < typedValue.length; i++) {
      if (
        i < currentWordData.word.length &&
        currentWordData.word[i] === typedValue[i] &&
        !currentWordData.mistakeCount
      ) {
        currentWordData.correctCount++
      } else {
        currentWordData.mistakeCount++
      }
    }
  }

  if (currentWordIndex > 0) {
    const previousWordData = wordDataList[currentWordIndex - 1]
    previousWordData.word = ""
  }

  wordDataList = [...wordDataList]

  return {
    wordDataList,
    typedInput,
    currentWordIndex,
    startTime,
    wordsPerMinute,
    charactersPerMinute,
  }
}
