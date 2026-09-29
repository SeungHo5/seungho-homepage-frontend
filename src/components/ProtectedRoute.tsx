import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ProtectedRoute가 감쌀 컴포넌트의 타입을 정의
//
// 예:
// <ProtectedRoute>
//   <Blog />
// </ProtectedRoute>
//
// 여기서 <Blog />가 children으로 들어온다.
interface  ProtectedRouteProps {
    children: ReactNode   
}

export default function ProtectedRoute({
    children, }: ProtectedRouteProps) {
    // AuthContext에서 현재 관리자 로그인 여부를 가져온다.
    //
    // isAdmin === true
    // → 로그인된 관리자
    //
    // isAdmin === false
    // → 로그인되지 않은 상태
    const { isAdmin } = useAuth();

    // 로그인 하지 않은 상태라면
    // 보호된 페이지를 보여주지 않고 홈으로 이동
    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    // 로그인 상태라면 children으로 감싼 컴포넌트를 보여준다.
    return children;
}