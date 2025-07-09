import EmployeeAccount from "./EmployeeAccount"

export default function AdminAccount(){

    function handleCreateEmployeeAccount(){
        alert("Crée !")
    }

    return (<>
        
        <EmployeeAccount/>
        <button onClick={handleCreateEmployeeAccount}>Créer un compte employé</button>
        </>
    )
}