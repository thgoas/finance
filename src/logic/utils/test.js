function calcularParcelas(valorTotal, numParcelas) {
  const valorParcela = valorTotal / numParcelas;
  const parcelas= [];

  for (let i = 0; i < numParcelas; i++) {
    parcelas.push(valorParcela);
  }

  return parcelas;
}

// Exemplo de uso
const valorTotal = 1245.49;
const numParcelas = 5;

const parcelas = calcularParcelas(valorTotal, numParcelas);
console.log(parcelas);

// function calcularParcelas(valorTotal, numParcelas) {
//   const valorParcela = valorTotal / numParcelas
//   console.log(valorParcela);
//   // const valorParcela = Math.floor(valorTotal / numParcelas);
//   const valorResidual = valorTotal- (valorParcela * numParcelas)
//   console.log(valorResidual);
//   const resto = valorTotal % numParcelas;
//   console.log(resto)
//   const parcelas = [];

//   for (let i = 0; i < numParcelas; i++) {
//     parcelas.push(valorParcela);
//   }

//   for (let i = 0; i < resto; i++) {
//     parcelas[i] += 1;
//   }

//   return parcelas;
// }

// // Exemplo de uso
// const valorTotal = 1245.49;
// const numParcelas = 5;

// const parcelas = calcularParcelas(valorTotal, numParcelas);
// console.log(parcelas);