const ids = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

const toPersianNumber = number =>
  number.toString().replace(/[0-9]/g, digit => ids[+digit])

export { toPersianNumber }
