function startWhitThree(number, digit) {
  const regex = new RegExp(`^${digit}`);

  if (regex.test(number)) {
    return true;
  }
}

function main(number) {
  if (!startWhitThree(number, 3) && number < 10 && number > 10) {
    console.log('No comienza');
  } else {
    console.log('Si comienza');
  }
}

main(3212413656);
main(111);
