import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageLoader from './PageLoader';

function ProtectedRoute({ children }) {
    const { isAuthenticated, checkingSession } = useAuth();

    if (checkingSession) {
        return <PageLoader label="Verifying session..." />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;
