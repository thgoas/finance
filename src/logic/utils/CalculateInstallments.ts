export default class CalculateInstallments {
  static calculate(totalValue: number, numberInstallments: number):number [] {
    const installmentValue = Math.floor(totalValue / numberInstallments);
  const rest = totalValue % numberInstallments;
  const installments: number[] = [];

  for (let i = 0; i < numberInstallments; i++) {
    installments.push(installmentValue);
  }

  for (let i = 0; i < rest; i++) {
    installments[i] += 1;
  }

  return installments;
}
}

