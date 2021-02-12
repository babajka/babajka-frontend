// Fisher-Yates shuffle algorithm
export const getShuffledArray = array => {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const item = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = item;
  }

  return newArray;
};
