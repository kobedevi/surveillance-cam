import { useAuth } from "../Auth/AuthContainer";
import LogoutButton from "../Auth/LogoutButton";

const Settings = () => {
    const { user } = useAuth();
    console.log(user);
    return (
        <>
            <h1>Settings</h1>
            <LogoutButton/>
        </>
    )
};

export default Settings;
