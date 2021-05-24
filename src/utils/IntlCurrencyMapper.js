/* eslint-disable module-resolver/use-alias */
// /* eslint-disable no-undef */
// /* eslint-disable module-resolver/use-alias */

class IntlCurrencyMapper {
  static formatCurrency(number) {
    return `\$${Number(number).toFixed(2)}`;
  }
  static formatCurrencyWithQuanity(number, quantity) {
    return `\$${Number(quantity * number).toFixed(2)}`;
  }
}

export default IntlCurrencyMapper;
