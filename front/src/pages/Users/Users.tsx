import { useEffect, useState } from "react";
import { GetApi, UserIsLogged } from "../../api/Axios";
import { UserRole, type User } from "../../api/User";
import Loading from "../../components/Loading";
import AdminUsers from "./AdminUsers";
import EmployeeUsers from "./EmployeeUsers";
import { MySessions } from "../Booking/MyBooked";
import { EndpointRoute } from "../../api/Endpoint";

export default function Users() {
    const [me, setMe] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            if (UserIsLogged()) {
                try {
                    const res = await GetApi(EndpointRoute.me);
                    setMe(res);
                } catch (e) {
                    setMe(null);
                }
            }
            setLoading(false);
        })();
    }, []);

    if (loading) return <Loading />;

    if(!me){
        return <Loading />
    }

    if(me.role == UserRole.client){
        return (
            <div className="account-container">
                <h1>Mon compte</h1>
                <p><strong>Nom :</strong> {me.name}</p>
                <p><strong>Email :</strong> {me.email}</p>
                <p><strong>Téléphone :</strong> {me.phone}</p>
                <MySessions/>
            </div>
        );
    }

    if(me.role == UserRole.employee){
        return (<EmployeeUsers />)
    }

    if(me.role == UserRole.admin){
        return (<AdminUsers />)
    }

}
