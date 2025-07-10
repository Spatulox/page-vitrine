import { useNavigate } from "react-router-dom";

export default function BackButton(){
    const navigate = useNavigate()
    return<a
        href=""
        onClick={(e) => {
            e.preventDefault();
            navigate(-1);
        }}> ← Retour à la liste</a>
}