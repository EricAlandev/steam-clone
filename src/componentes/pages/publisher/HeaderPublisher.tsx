
type DistribuidoraC = {
    capa?: string, 
    fundo?: string, 
    nome_distribuidora?: string,
    seguidores?: number,
    seguidor?: boolean,
    adicionarSeguidor: (valor: null) => void,
    removeFollower: (valor: null) => void,

}

export default function HeaderPublisher({
    capa, 
    fundo, 
    nome_distribuidora,
    seguidores,
    seguidor,
    adicionarSeguidor,
    removeFollower
} : DistribuidoraC){

    return(
        <div className="absolute z-0">
                {/*Background of the header*/}
                <img
                    src={fundo}
                    className="fixed inset-0 bg-black opacity-80 h-full min-h-[190px] max-h-[22vh]"
                />

                {/*main*/}
                <div className="absolute flex gap-4 z-10 mt-5 ml-5">
                    <img
                        src={capa}
                        className="min-w-[10vw] max-w-[25vw] min-h-[10vw] max-h-[25vw]"
                    />

                    {/*Name, followers */}
                    <div className=" flex flex-col gap-2 mt-3.5 text-[white] ">
                        <p className="min-w-[120px]">{nome_distribuidora}</p>
                        
                        {/*followers */}
                        <div className="relative flex items-center gap-4 px-1 py-0.5 rounded-sm ">

                            {/*overlay */}
                            <div className="absolute inset-0 bg-[#111111] z-0 opacity-80 rounded-md"></div>
                            
                            <div className="relative top-0 z-10 flex items-center gap-4 px-1 py-0.5 ">
                                {seguidor ? (
                                    <button
                                    className="min-w-[80px] max-w-[80px] p-1.5 bg-[#588A1B] text-[#E0E0E0] rounded-[5px]"
                                    onClick={() => removeFollower(null)}
                                    >
                                        Deseguir
                                    </button>
                                ): (
                                    <button
                                    className="min-w-[80px] p-1.5 bg-[#588A1B] text-[#E0E0E0] rounded-[5px]"
                                    onClick={() => adicionarSeguidor(null)}
                                    >
                                        Seguir
                                    </button>
                                )}
                                

                                <p className="text-center text-[#A0A0A0]">
                                    {seguidores} <br/>
                                    <span className="text-[15px]"
                                    >
                                        Seguidores
                                    </span>
                                </p>
                            </div>
                        </div>

                    </div>
                    
                </div>
        </div>
    )
}