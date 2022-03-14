const moneyMask =(n) =>{
    const value = n.toString().replace(/\D/g,'')
    const number =  parseInt(value.toString().replace(/\D/g,'')).toString()
    const length = number.length
    /*
    Se, por algum motivo, não for possível obter o valor, para não retornar um erro no campo "N,aN"
    A condicional abaixo irá retornar "R$ 0,00"
    */
    if(isNaN(number)) return 'R$ 0,00'
    
    /*
    O switch case abaixo compara a quantidade de dígitos do campo de moeda para criar os separadores de centavos, milhares, milhões, etc.
    */
    switch (length) {
        case 1:
          return `R$ 0,0${number}`
          break;
        case 2:
          return `R$ 0,${number}`
          break;
        case 3:
            return `R$ ${number.substring(0,1)},${number.substring(1, 3)}`
            break;
        case 4:
            return `R$ ${number.substring(0,2)},${number.substring(2, 4)}`
            break;
        case 5:
            return `R$ ${number.substring(0,3)},${number.substring(3, 5)}`
            break;
        case 6:
            return `R$ ${number.substring(0,1)}.${number.substring(1,4)},${number.substring(4, 6)}`
            break;
        case 7:
            return `R$ ${number.substring(0,2)}.${number.substring(2,5)},${number.substring(5, 7)}`
        case 8:
            return `R$ ${number.substring(0,3)}.${number.substring(3,6)},${number.substring(6, 8)}`
            break;
        case 9:
            return `R$ ${number.substring(0,1)}.${number.substring(1,4)}.${number.substring(4, 7)},${number.substring(7, 9)}`
            break;
        case 10:
            return `R$ ${number.substring(0,2)}.${number.substring(2,5)}.${number.substring(5, 8)},${number.substring(8, 10)}`
            break;
        case 11:
            return `R$ ${number.substring(0,3)}.${number.substring(3,6)}.${number.substring(6, 9)},${number.substring(9, 11)}`
            break;
        case 12:
            return `R$ ${number.substring(0,1)}.${number.substring(1,4)}.${number.substring(4, 7)}.${number.substring(7, 10)},${number.substring(10, 12)}`
            break;
        default:
          return 0
    }
}

export {
    moneyMask
}