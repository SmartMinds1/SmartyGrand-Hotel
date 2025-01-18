import { fetchUserData } from '../api/userApi';

const signIn = () =>{
    useEffect(() => {
        const getUserData = async () => {
            const userData = await fetchUserData();
            setUser(userData);
        };
        getUserData();
    }, [setUser]);

    return(
    <div>
         <h1>Welcome to the Home Page</h1>
       
     
        <p>User: {user.name}</p>
    </div>
    );
}
export default signIn;