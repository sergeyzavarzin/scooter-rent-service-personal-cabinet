export const getPhoneRegexpSymbolsFromStart = (length) => {
  const phoneRegexpExpressionBySymbol= ['(\\+7|8)', ' ', '\\(', '9', '\\d', '\\d', '\\)', ' ', '\\d', '\\d', '\\d', '-', '\\d', '\\d', '-', '\\d', '\\d'];
  const phoneRegexpExpression = `^${phoneRegexpExpressionBySymbol.slice(0, length).join('')}$`;
  return new RegExp(phoneRegexpExpression);
}

export const getNextPhoneValue = (phone, prevPhoneValue) => {
  if (prevPhoneValue.length === phone.length) return phone;
  if (prevPhoneValue.length > phone.length && !/^\d$/.test(prevPhoneValue[prevPhoneValue.length-1])) {
    return phone == '+7 ' ? '+' : phone.slice(0, -1); // eslint-disable-line
  }

  if (phone.length === 1 && phone !== '7' && phone !== '8' && phone !== '9' && phone !== '+') return '';
  if (phone === '+' || phone === '7' || phone === '+7') return '+7 (';
  if (phone === '8') return '8 (';
  if (phone === '9') return '+7 (9';

  const phoneLength = phone[0] === '+'? (phone.length - 1): phone.length;
  
  if (!getPhoneRegexpSymbolsFromStart(phoneLength).test(phone)) {
    const lastSymbol = phone[phone.length - 1];
    const phoneHead = phone.slice(0, -1);
    if (phoneLength < 17 && lastSymbol == '9') { // eslint-disable-line
      if (phoneLength === 2) return `${phoneHead} (${lastSymbol}`;
      if (phoneLength === 3) return `${phoneHead}(${lastSymbol}`;
    }
    if (phone.length < 17 && /^\d$/.test(lastSymbol)) {
      if (phoneLength === 7) return `${phoneHead}) ${lastSymbol}`;
      if (phoneLength === 8) return `${phoneHead} ${lastSymbol}`;
    }
    return phone.slice(0, -1);
  }
  
  if (phoneLength === 6) return `${phone}) `;
  if (phoneLength === 11 || phoneLength === 14) return `${phone}-`;

  return phone;
}
