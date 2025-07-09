import EmployeeUsers from "./EmployeeUsers"

export default function AdminUsers(){

    function handleCreateEmployeeUsers(){
        alert("Crée !")
    }

    return (<>
        
        <EmployeeUsers/>
        <button onClick={handleCreateEmployeeUsers}>Créer un compte employé</button>
        </>
    )
}