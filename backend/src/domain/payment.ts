export const isValidPayment = (totalAmount: number, amountPaid: number): boolean =>
  Number.isFinite(totalAmount) &&
  Number.isFinite(amountPaid) &&
  totalAmount >= 0 &&
  amountPaid >= totalAmount

export const calculateChange = (totalAmount: number, amountPaid: number): number => {
  if (!isValidPayment(totalAmount, amountPaid)) {
    throw new RangeError('Insufficient payment amount')
  }

  return amountPaid - totalAmount
}
