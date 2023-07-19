<script>
  export let wordDataList;
</script>

<div class="flex w-full overflow-hidden text-lg gap-x-2">
  {#each wordDataList as wordData}
    {#if wordData.word !== ""}
      <span class="flex px-2 py-1 bg-gray-200 rounded-lg">
        {#each wordData.word as character, index}
          <span
            class="{`${
              index < wordData.correctCount
                ? 'text-green-500'
                : index < wordData.correctCount + wordData.mistakeCount
                ? 'text-red-500'
                : ''
            }`}"
          >
            {character}
          </span>
        {/each}
      </span>
    {/if}
  {/each}
</div>
