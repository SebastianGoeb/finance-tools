import {describe, expect, test} from "vitest";
import {parseFrankfurterVolksbankStatementsCsv} from "./parse";

const csv = `Bezeichnung Auftragskonto;IBAN Auftragskonto;BIC Auftragskonto;Bankname Auftragskonto;Buchungstag;Valutadatum;Name Zahlungsbeteiligter;IBAN Zahlungsbeteiligter;BIC (SWIFT-Code) Zahlungsbeteiligter;Buchungstext;Verwendungszweck;Betrag;Waehrung;Saldo nach Buchung;Bemerkung;Gekennzeichneter Umsatz;Glaeubiger ID;Mandatsreferenz
FVB KontoDirekt Plus;DE12345678901234567890;FFVBDEFFXXX;Frankfurter Volksbank Rhein/Main;30.01.2020;31.01.2020;Musterfirma;DE9876543210876543210;;LASTSCHRIFT;Eine Zahlung;-12,34;EUR;1222,22;;;;
FVB KontoDirekt Plus;DE12345678901234567890;FFVBDEFFXXX;Frankfurter Volksbank Rhein/Main;29.01.2020;30.01.2020;Arbeitgeber;;;DAUERAUFTRAG;Gehalt;1234,56;EUR;1234,56;;;;

`
// ^--- blank lines

describe("parseFrankfurterVolksbankStatementsCsv", () => {
  test("parseFrankfurterVolksbankStatementsCsv", () => {
    expect(parseFrankfurterVolksbankStatementsCsv(csv)).toEqual([
      {
        bookingDate: new Date("2020-01-30 00:00:00Z"),
        valueDate: new Date("2020-01-31 00:00:00Z"),
        otherParty: "Musterfirma",
        iban: "DE9876543210876543210",
        description: `Eine Zahlung`,
        currency: "EUR",
        amount: -12.34,
        balance: 1222.22,
      },
      {
        bookingDate: new Date("2020-01-29 00:00:00Z"),
        valueDate: new Date("2020-01-30 00:00:00Z"),
        otherParty: "Arbeitgeber",
        iban: undefined,
        description: `Gehalt`,
        currency: "EUR",
        amount: 1234.56,
        balance: 1234.56,
      },
    ])
  })
})
