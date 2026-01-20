
export  function ConversorPrecos(preco: number){

    const precoConvertido = preco /100;

    return precoConvertido
}

export  function CalculoPercentual(preco: number, preco_desconto: number){
    const calculoPercentual = 100 - ((preco_desconto/preco) * 100);

    const calculoPercentualConvertido = calculoPercentual.toFixed(0);

    return calculoPercentualConvertido
}