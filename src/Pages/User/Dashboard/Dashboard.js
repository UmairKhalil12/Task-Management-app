import AdminHomePage from "../../AdminHomePage/AdminHomePage";

export default function Dashboard({user , admin}){
    console.log('Dashboard' , user , admin); 
    return (
        <AdminHomePage admin={admin} user={user} />
    )
}