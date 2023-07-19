export type WordData = {
  word: string
  correctCount: number
  mistakeCount: number
}

export type HandleInputResult = {
  wordDataList: WordData[]
  typedInput: string
  currentWordIndex: number
  startTime: Date | undefined
  wordsPerMinute: number
  charactersPerMinute: number
}
