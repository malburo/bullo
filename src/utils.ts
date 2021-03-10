export const findItemFromArray = (array: any, itemId: any) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === itemId) return [array[i], i];
  }
};
