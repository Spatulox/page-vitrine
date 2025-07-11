import { useEffect, useState } from "react"
import { GetApi } from "../../api/Axios"
import { EndpointRoute } from "../../api/Endpoint"
import type { Sessions } from "../../api/Sessions"
import { SessionsList } from "./BookList"
import NotFound from "../../components/NotFound"

export function MySessions(){
    return <>
    <MyActiveBook/>
    <MyOldBook/>
    </>
}


function MyActiveBook(){
    const [book, setBook] = useState<Sessions[]>()

    useEffect(() => {
        (async () => {
            try {
                const res = await GetApi(`${EndpointRoute.book}`)
                setBook(res)
            } catch (error) {
                console.error(error)
            }
        })()
    },[])

    if(!book){
        return <NotFound />
    }

    return<>
        <div>
            <h1>Current book</h1>
            <SessionsList sessions={book}/>
        </div>
    </>
}

function MyOldBook(){
    const [book, setBook] = useState<Sessions[]>()

    useEffect(() => {
        (async () => {
            try {
                const res = await GetApi(`${EndpointRoute.book}/historic`)
                setBook(res)
            } catch (error) {
                console.error(error)
            }
        })()
    },[])

    if(!book){
        return <NotFound />
    }

    return<>
        <div>
            <h1>Old book</h1>
            <SessionsList sessions={book}/>
        </div>
    </>
}