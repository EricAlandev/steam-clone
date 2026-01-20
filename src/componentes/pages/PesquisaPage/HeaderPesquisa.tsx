
'use client'

type valores = {
    chamaFuncao : (precoOrdem: string) => void;
    quantidadeResultados: number
}

export type preco = {
    precoOrdem? : string
}


export default function HeaderPesquisa({chamaFuncao, quantidadeResultados}: valores){

    const pegaValue = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const valorSelecionado = e.target.value;
        await chamaFuncao(valorSelecionado)
    };

    return(
        <div className="bg-[#101822]">
            {/*Cabeçário - busca; */}
            <div className="flex flex-col  w-[80vw] mx-auto gap-4  py-2.5 ">

                {/*formulário */}
                <form 
                    className="flex items-center gap-4"
                >
                    <label className="text-[white]">Ordenar por</label>
                    <select 
                    name="precoOrdem" id=""
                    onChange={pegaValue}
                    className=" p-1 text-[white] bg-[#223A4C]"
                    >
                        <option
                        value={"Menor Preço"} 
                        onClick={() => chamaFuncao("Menor Preço")}
                        className="text-[white]"
                        >
                            Menor Preço
                        </option>

                        <option 
                        value={"Maior Preço"} 
                        
                        className=""
                        >
                            Maior Preço
                        </option>

                        <option 
                        value={"Nome"} 
                        >
                            Nome
                        </option>

                        <option 
                        value={"Lançamento"} 
                        >
                            Lançamentos
                        </option>
                    </select>
                </form>

                <p className="w-max pb-1 text-[white] border-b-[1.5px]">
                    {quantidadeResultados ? quantidadeResultados : 0} resultados correspondem à sua busca
                </p>
            </div>
        </div>
    )
}