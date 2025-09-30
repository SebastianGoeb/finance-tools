export interface Transaction {
  bookingDate: Date,
  valueDate: Date,
  otherParty: string,
  iban: string | undefined,
  description: string,
  currency: string,
  amount: number,
  balance: number,
}
