import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <>
            <div id="sidebar">
                <nav>
                    <ul>
                        <li>
                            <a href={`/forms`}>Forms</a>
                        </li>
                        <li>
                            <a href={`/services`}>Services</a>
                        </li>
                        <li>
                            <a href={`/permissions`}>Permissions</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}

export default Root;