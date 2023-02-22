import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "./user/userSlice";

const Root = () => {
    const user = useAppSelector((state) => state.user.profile);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user === null) {
            navigate("/login", { replace: true });
        }
    }, [navigate, user])

    const logoutUser = () => {
        dispatch(logout());
    }

    return (
        <>
            <div id="sidebar">
                <nav>
                    {
                        user !== null ? (
                            <ul>
                                <li className="pb-4 bg-gray-200 !p-3 rounded-lg whitespace-nowrap">
                                    <p className="text-sm font-bold leading-none">{user.email}</p>
                                    <p className="text-xs font-medium">{user.role}</p>
                                </li>
                                <li>
                                    <a href={`/forms`}>Forms</a>
                                </li>
                                <li>
                                    <a href={`/services`}>Services</a>
                                </li>
                                <li>
                                    <a href={`/permissions`}>Permissions</a>
                                </li>
                                <li>
                                    <a onClick={logoutUser} href="/login" className="bg-red-100 !text-red-700 font-bold">Logout</a>
                                </li>
                            </ul>
                        ) : (
                            <ul>
                                <li>
                                    <a href={`/login`}>Login</a>
                                </li>
                            </ul>
                        )
                    }
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}

export default Root;