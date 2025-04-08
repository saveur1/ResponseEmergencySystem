// components/ProtectedRoute.tsx
import { AuthContext } from '@/Context/user-context';
import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedProps {
    children: ReactNode;
    allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedProps) => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("Context must be used inside a Provider");
    }

    const { user, isLoginLoading } = authContext;

    // Wait until auth state is loaded
    if (isLoginLoading) 
        return <div className="text-center py-8">Loading...</div>;
    

    if (user && allowedRoles.includes(user.role?.toLowerCase()))
        return children;
    

    return <Navigate to="/login" />;
};

export default ProtectedRoute;
