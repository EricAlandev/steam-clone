

export default function ConversorDate(lancamento: string | undefined){
    
    //Converte o mês 
    const conversor = (mes: string) => {
        
        switch(mes){
            case "01": return "jan.";
            case "02": return "fev.";
            case "03": return "mar.";
            case "04": return "abr.";
            case "05": return "mai.";
            case "06": return "jun.";
            case "07": return "jul.";
            case "08": return "ago.";
            case "09": return "set.";
            case "10": return "out.";
            case "11": return "nov.";
            case "12": return "dez.";
            default: return mes;      
        }
    }

    let [ano, mes, dia]  = lancamento!.slice(0,10).split("-");

    //converte o mês
    const mesConvertido = conversor(mes);

    const DataFinal = `${dia}/${mesConvertido}/${ano}`
    
    return DataFinal
}