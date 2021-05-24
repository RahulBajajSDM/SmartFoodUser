const CardType = (type) => {
  switch (type) {
    case 'visa':
      // @ts-ignore
      return require('../assets/cards/visa.png');
    case 'discover':
      // @ts-ignore
      return require('../assets/cards/discover.png');
    case 'american-express':
      // @ts-ignore
      return require('../assets/cards/american_express.png');
    case 'jcb':
      // @ts-ignore
      return require('../assets/cards/jcb.png');
    case 'mastercard':
      // @ts-ignore
      return require('../assets/cards/master_card.png');
    default:
      break;
  }
};

export default CardType;
