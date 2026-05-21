export function calculateChange(totalAmount: number, amountPaid: number): number {
  return Math.max(0, amountPaid - totalAmount)
}

export function isValidPayment(totalAmount: number, amountPaid: number): boolean {
  return amountPaid > 0 && amountPaid >= totalAmount
}
