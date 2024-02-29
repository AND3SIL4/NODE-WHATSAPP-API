import chalk from 'chalk';

export class ColorsStylesForText {
  succcess = chalk.green;
  succcessWithBg = chalk.black.bgGreen;
  failed = chalk.red;
  information = chalk.black.bgBlue;

  onSuccess(text, isBg) {
    if (isBg) {
      return console.log(this.succcessWithBg(text));
    } else {
      return console.log(this.succcess(text));
    }
  }

  onFailed(text) {
    return console.log(this.failed(text));
  }

  onInfo(text) {
    return console.log(this.information(text));
  }
}
