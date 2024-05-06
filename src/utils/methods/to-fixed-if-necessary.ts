function toFixedIfNecessary(value: number, decimalPoints: number) {
  return +value.toFixed(decimalPoints);
}

export default toFixedIfNecessary;