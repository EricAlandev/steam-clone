
import HeaderMobile from "../header/HeaderMobile"
import { ReactNode } from "react"

type TypeLayout = {
    tipo?: ReactNode
}

export default function Layout({tipo} : TypeLayout) {
    return(
        <>
            {tipo ? tipo : <HeaderMobile/>}
        </>
    )
}