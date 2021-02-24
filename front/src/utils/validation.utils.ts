export const isValidBlockNumber = (blockID: any): boolean => {
  if (isNaN(+blockID)) {
    return false;
  }
  if (+blockID < 0 || +blockID > 18446744073709551615) {
    return false;
  }

  return true;
}