export const validatePesel = (pesel: string) => {
  const weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let sum = 0;
  const controlNumber = parseInt(pesel.substring(10, 11));

  for (let i = 0; i < weight.length; i++) {
    sum += parseInt(pesel.substring(i, i + 1)) * weight[i];
  }
  sum = sum % 10;
  return (10 - sum) % 10 === controlNumber;
};

export const validateNip = (nip: string) => {
  // if (typeof nip !== 'string') return false;

  // nip = nip.replace(/[\\-]/gi, '');

  const weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  let sum = 0;
  const controlNumber = parseInt(nip.substring(9, 10));
  const weightCount = weight.length;
  for (let i = 0; i < weightCount; i++) {
    sum += parseInt(nip.substr(i, 1)) * weight[i];
  }

  return sum % 11 === controlNumber;
};
