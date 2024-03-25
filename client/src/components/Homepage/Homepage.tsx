import { useNavigate } from "react-router-dom"

export default function Homepage() {
    const navigation = useNavigate();


    return <>
    Homepage
    <span onClick={() => navigation("/Login")}>Login</span>
    <span onClick={() => navigation("/Register")}>Register</span>
    </>
}