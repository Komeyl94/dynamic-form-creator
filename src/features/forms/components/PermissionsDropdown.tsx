import { Dropdown } from "flowbite-react"
import { useFormikContext } from "formik";
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";

type PermissionsDropdownProps = {
    index: number;
    permissions: string[];
    // addPermissionForField: (type: string) => void;
}

const PermissionsDropdown = ({ index, permissions }: PermissionsDropdownProps) => {
    const users = useAppSelector((state) => state.permissions.users);
    const navigate = useNavigate();
    const formik = useFormikContext();

    const addPermissionForField = (type: string) => {
        if (permissions.includes(type)) {
            formik.setFieldValue(`fields[${index}].permissions`, permissions.filter(p => p !== type));
        } else {
            formik.setFieldValue(`fields[${index}].permissions`, [...permissions, type]);
        }
    }

    return (
        <Dropdown
            label={`${permissions.length > 0 ? `(${permissions.length})` : 'Select'} Permissions`}
            pill={true}
            color="dark"
            size="sm"
        >
            {users.length > 0 ? users.map((user) => (
                <Dropdown.Item key={user.id} onClick={() => addPermissionForField(user.type)}>
                    {permissions.includes(user.type) ? `✔ ` : ``}{user.type}
                </Dropdown.Item>
            )) : (
                <Dropdown.Item onClick={() => navigate("/permissions/create")}>
                    There are no permissions/roles. Click to add
                </Dropdown.Item>
            )}
        </Dropdown>
    )
}

export default PermissionsDropdown