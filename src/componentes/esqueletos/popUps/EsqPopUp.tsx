

type valoresPopUp = {
    closePopUp: (close : null) => void;
}

export default function EsqPopUp({closePopUp} : valoresPopUp){

    return(
        <>
            {/*Overlay */}
            <div className="fixed inset-0 bg-[black] opacity-70"></div>

            {/*PopUp */}
            <div
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vh] bg-[white] rounded-md"
            >
                
                {/*Fechar o popUp */}
                <div className="flex justify-end ">
                    <img
                        src={"/gerais/close.png"}
                        className="mt-3.5 mr-4 p-2 bg-[#A0A0A0] rounded-[50%]"
                        onClick={() => closePopUp(null)}
                    />
                </div>
            </div>
        </>
    )
}