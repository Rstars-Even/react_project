import { DataType } from "@renderer/data";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface ContextProps {
    data: DataType[]
    setData: Dispatch<SetStateAction<DataType[]>>
}
export const CodeContext = createContext<ContextProps | undefined>(undefined)

interface Props {
    children: ReactNode
}
export const CodeProvider = ({ children }: Props) => {
    const [data, setData] = useState<DataType[]>([])

    return (
        <CodeContext.Provider value={{ data, setData }}>
            {children}
        </CodeContext.Provider>
    )
}