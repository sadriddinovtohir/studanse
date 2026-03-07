export const colums = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone" },
    { key: "dateOfBirth", label: "Date of Birth" },
    { key: "hiredDate", label: "Hired Date" },
    { key: "school", label: "School" },
    { key: "userStatus", label: "Status" },
];

export const initialValues = {
    search: "",
    schoolId: "",
    userStatus: "",
    hiredDateFrom: "",
    hiredDateTo: "",
    dateOfBirthFrom: "",
    dateOfBirthTo: "",
    page: "",
    size: "",
    sortBy: "",
    direction: "",
};

export const values = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    hiredDate: "",
    schoolId: "",
    userStatus: "",
};

export const userStatus = [
    {
        value: "ACTIVE",
        label: "ACTIVE",
    },
    {
        value: "BLOCK",
        label: "BLOCK",
    },
];