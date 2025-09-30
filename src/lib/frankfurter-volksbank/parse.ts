import {Transaction} from "../common/types";
import parse from "csv-simple-parser";
import {parseGermanDate, parseGermanNumber} from "../common/parse";

export function parseFrankfurterVolksbankStatementsCsv(csv: string): Transaction[] {
  const csvNonBlank = csv.split("\n").filter(line => !line.match(/^s*$/)).join("\n")
  return parse(csvNonBlank, {delimiter: ";", header: true})
    .filter(row => row["Buchungstag"] !== "")
    .map(row => ({
      bookingDate: parseGermanDate(row["Buchungstag"]),
      valueDate: parseGermanDate(row["Valutadatum"]),
      otherParty: row["Name Zahlungsbeteiligter"],
      iban: row["IBAN Zahlungsbeteiligter"] === "" ? undefined : row["IBAN Zahlungsbeteiligter"],
      description: row["Verwendungszweck"],
      currency: row["Waehrung"],
      amount: parseGermanNumber(row["Betrag"]),
      balance: parseGermanNumber(row["Saldo nach Buchung"]),
    }));
}
