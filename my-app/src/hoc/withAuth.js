import { Navigate } from "react-router-dom"
import { getLocalStorage } from "../utils/localStorage"

const withAuthentication = (Component, props) => {
    const isAuthenticated = getLocalStorage('chatapp')
    
    if (isAuthenticated) {
        return (
            <Component  {...props} />
        )
    }
    return (<Navigate to="/login"/>);
}
export default withAuthentication;