import { useEffect, useState } from "react"
import { DeleteApi, GetApi } from "../../api/Axios"
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
    const [refresh, setRefresh] =useState(0)

    useEffect(() => {
        (async () => {
            try {
                const res = await GetApi(`${EndpointRoute.book}`)
                setBook(res)
            } catch (error) {
                console.error(error)
            }
        })()
    },[refresh])


    async function handleCancel(id: string){
        if(!confirm("Voulez-vous annuler la réservation ?")){
            return
          }
          await DeleteApi(`${EndpointRoute.book}/${id}`)
          setRefresh(r => r + 1)
    }

    if(!book){
        return <NotFound />
    }

    return<>
        <div>
            <h1>Sessions à venir</h1>
            <SessionsList
                sessions={book}
                onCancel={(session) => {
                    handleCancel(session._id)
                }}
            />
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
            <h1>Sessions passés</h1>
            <SessionsList sessions={book}/>
        </div>
    </>
}