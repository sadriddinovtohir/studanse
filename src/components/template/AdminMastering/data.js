import {
    AlertCircle,
    BookOpen,
    Building2,
    Calendar,
    FileText,
    GraduationCap,
    Shield,
    UserPlus,
    Users,
} from "lucide-react";

export const item = [
    {
        type: "students",
        title: "Students",
        description: "Manage student records, grades, and enrollment status",
        icon: GraduationCap,
        gradient: "from-blue-500/20 to-cyan-500/20",
        borderColor: "border-blue-500/30",
        iconColor: "text-blue-500",
        buttonGradient: "from-blue-600 to-cyan-600",
    },
    {
        type: "teachers",
        title: "Teachers",
        description: "Manage teacher profiles, subjects, and availability",
        icon: Users,
        gradient: "from-green-500/20 to-emerald-500/20",
        borderColor: "border-green-500/30",
        iconColor: "text-green-500",
        buttonGradient: "from-green-600 to-emerald-600",
    },
    {
        type: "admins",
        title: "Admins",
        description: "Manage administrator accounts and permissions",
        icon: Shield,
        gradient: "from-purple-500/20 to-pink-500/20",
        borderColor: "border-purple-500/30",
        iconColor: "text-purple-500",
        buttonGradient: "from-purple-600 to-pink-600",
    },
    {
        type: "classes",
        title: "Classes",
        description: "Manage class schedules, capacity, and assignments",
        icon: BookOpen,
        gradient: "from-orange-500/20 to-red-500/20",
        borderColor: "border-orange-500/30",
        iconColor: "text-orange-500",
        buttonGradient: "from-orange-600 to-red-600",
    },
    {
        type: "lessons",
        title: "Lessons",
        description: "Manage lesson plans, schedules, and content",
        icon: Calendar,
        gradient: "from-teal-500/20 to-cyan-500/20",
        borderColor: "border-teal-500/30",
        iconColor: "text-teal-500",
        buttonGradient: "from-teal-600 to-cyan-600",
    },
    {
        type: "subjects",
        title: "Subjects",
        description: "Manage academic subjects, codes, and requirements",
        icon: FileText,
        gradient: "from-indigo-500/20 to-purple-500/20",
        borderColor: "border-indigo-500/30",
        iconColor: "text-indigo-500",
        buttonGradient: "from-indigo-600 to-purple-600",
    },
    {
        type: "reasons",
        title: "Reasons",
        description: "Manage absence and tardiness reason codes",
        icon: AlertCircle,
        gradient: "from-yellow-500/20 to-orange-500/20",
        borderColor: "border-yellow-500/30",
        iconColor: "text-yellow-500",
        buttonGradient: "from-yellow-600 to-orange-600",
    },
    {
        type: "school",
        title: "School",
        description: "Manage school information and settings",
        icon: Building2,
        gradient: "from-rose-500/20 to-pink-500/20",
        borderColor: "border-rose-500/30",
        iconColor: "text-rose-500",
        buttonGradient: "from-rose-600 to-pink-600",
    },
];

export const getColumns = (entityType) => {
    switch (entityType) {
        case "students":
            return [
                { key: "firstName", label: "First Name" },
                { key: "lastName", label: "Last Name" },
                { key: "email", label: "Email" },
                { key: "phoneNumber", label: "Phone" },
                { key: "dateOfBirth", label: "Date of Birth" },
                { key: "enrollmentDate", label: "Enrollment Date" },
                { key: "classGroupName", label: "Class" },
                { key: "status", label: "Status" },
            ];
        case "teachers":
            return [
                { key: "firstName", label: "First Name" },
                { key: "lastName", label: "Last Name" },
                { key: "email", label: "Email" },
                { key: "phoneNumber", label: "Phone" },
                { key: "dateOfBirth", label: "Date of Birth" },
                { key: "hiredDate", label: "Hired Date" },
                { key: "qualification", label: "Qualification" },
                { key: "status", label: "Status" },
            ];
        case "admins":
            return [
                { key: "firstName", label: "First Name" },
                { key: "lastName", label: "Last Name" },
                { key: "email", label: "Email" },
                { key: "phoneNumber", label: "Phone" },
                { key: "dateOfBirth", label: "Date of Birth" },
                { key: "hiredDate", label: "Hired Date" },
                { key: "userStatus", label: "Status" },
            ];
        case "classes":
            return [
                { key: "name", label: "Class Name" },
                { key: "description", label: "Description" },
                { key: "academicYear", label: "Academic Year" },
                { key: "teacherFullName", label: "Teacher" },
            ];
        case "lessons":
            return [
                { key: "name", label: "Name" },
                { key: "dayOfWeek", label: "Day" },
                { key: "startTime", label: "Start Time" },
                { key: "endTime", label: "End Time" },
                { key: "subjectName", label: "Subject" },
                { key: "teacherFullName", label: "Teacher" },
                { key: "classGroupName", label: "Class" },
                { key: "isActive", label: "Active" },
            ];
        case "subjects":
            return [
                { key: "name", label: "Name" },
                { key: "description", label: "Description" },
            ];
        case "reasons":
            return [
                { key: "name", label: "Name" },
                { key: "description", label: "Description" },
            ];
        case "school":
            return [
                { key: "name", label: "School Name" },
                { key: "address", label: "Address" },
                { key: "establishedYear", label: "Established Year" },
            ];
        default:
            return [];
    }
};

export const getValues = (entityType) => {
    switch (entityType) {
        case "students":
            return {
                icon: GraduationCap,
                title: "Student",
                gradient: "from-blue-600 to-cyan-600",
                fields: [
                    {
                        name: "firstName",
                        label: "First Name",
                        type: "text",
                        required: true,
                    },
                    {
                        name: "lastName",
                        label: "Last Name",
                        type: "text",
                        required: false,
                    },
                    {
                        name: "email",
                        label: "Email Address",
                        type: "email",
                        required: true,
                    },
                    {
                        name: "phoneNumber",
                        label: "Phone Number",
                        type: "tel",
                        required: true,
                    },
                    {
                        name: "dateOfBirth",
                        label: "Date of Birth",
                        type: "date",
                        required: false,
                    },
                    {
                        name: "enrollmentDate",
                        label: "Enrollment Date",
                        type: "date",
                        required: false,
                    },
                    {
                        name: "classGroupId",
                        label: "Class GroupId",
                        type: "select",
                        options: [],
                        required: true,
                    },
                    {
                        name: "status",
                        label: "Status",
                        type: "select",
                        options: [],
                        required: false,
                    },
                ],
                defaultValues: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    dateOfBirth: "",
                    enrollmentDate: "",
                    classGroupId: "",
                    status: "ACTIVE",
                },
            };
        case "teachers":
            return {
                icon: Users,
                title: "Teacher",
                gradient: "from-green-600 to-emerald-600",
                fields: [
                    {
                        name: "firstName",
                        label: "First Name",
                        type: "text",
                        required: true,
                    },
                    {
                        name: "lastName",
                        label: "Last Name",
                        type: "text",
                        required: false,
                    },
                    {
                        name: "email",
                        label: "Email Address",
                        type: "email",
                        required: true,
                    },
                    {
                        name: "phoneNumber",
                        label: "Phone Number",
                        type: "tel",
                        required: true,
                    },
                    {
                        name: "dateOfBirth",
                        label: "Date of Birth",
                        type: "date",
                        required: false,
                    },
                    {
                        name: "hiredDate",
                        label: "Hired Date",
                        type: "date",
                        required: false,
                    },
                    {
                        name: "qualification",
                        label: "Qualification",
                        type: "text",
                        required: false,
                    },
                    {
                        name: "status",
                        label: "Status",
                        type: "select",
                        options: [],
                        required: true,
                    },
                ],
                defaultValues: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    dateOfBirth: "",
                    hiredDate: "",
                    qualification: "",
                    status: "ACTIVE",
                },
            };
        case "admins":
            return {
                icon: Shield,
                title: "Admin",
                gradient: "from-purple-600 to-pink-600",
                fields: [
                    {
                        name: "firstName",
                        label: "First Name",
                        type: "text",
                        required: true,
                    },
                    {
                        name: "lastName",
                        label: "Last Name",
                        type: "text",
                        required: false,
                    },
                    {
                        name: "email",
                        label: "Email Address",
                        type: "email",
                        required: true,
                    },
                    {
                        name: "phoneNumber",
                        label: "Phone Number",
                        type: "tel",
                        required: true,
                    },
                    {
                        name: "dateOfBirth",
                        label: "Date of Birth",
                        type: "date",
                        required: false,
                    },
                    {
                        name: "hiredDate",
                        label: "Hired Date",
                        type: "date",
                        required: false,
                    },
                    {
                        name: "userStatus",
                        label: "Status",
                        type: "select",
                        options: [],
                        required: true,
                    },
                ],
                defaultValues: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    dateOfBirth: "",
                    hiredDate: "",
                    userStatus: "ACTIVE",
                },
            };
        case "classes":
            return {
                icon: BookOpen,
                title: "Class",
                gradient: "from-orange-600 to-red-600",
                fields: [
                    {
                        name: "name",
                        label: "Class Name",
                        type: "text",
                        required: true,
                    },
                    {
                        name: "description",
                        label: "Description",
                        type: "textarea",
                        required: false,
                    },
                    {
                        name: "academicYear",
                        label: "Academic Year",
                        type: "text",
                        required: false,
                    },
                    {
                        name: "status",
                        label: "Status",
                        type: "select",
                        options: [],
                        required: true,
                    },
                    {
                        name: "teacherId",
                        label: "Teacher",
                        type: "select",
                        options: [],
                        required: false,
                    },
                ],
                defaultValues: {
                    name: "",
                    description: "",
                    academicYear: "",
                    status: "ACTIVE",
                    teacherId: "",
                },
            };
        case "lessons":
            return {
                icon: Calendar,
                title: "Lesson",
                gradient: "from-teal-600 to-cyan-600",
                fields: [
                    {
                        name: "name",
                        label: "Lesson Name",
                        type: "text",
                        required: true,
                    },
                    {
                        name: "dayOfWeek",
                        label: "Day of Week",
                        type: "select",
                        options: [],
                        required: false,
                    },
                    {
                        name: "startTime",
                        label: "Start Time",
                        type: "time",
                        required: false,
                    },
                    {
                        name: "endTime",
                        label: "End Time",
                        type: "time",
                        required: false,
                    },
                    {
                        name: "isActive",
                        label: "Is Active",
                        type: "select",
                        options: [],
                        required: true,
                    },
                    {
                        name: "subjectId",
                        label: "Subject Name",
                        type: "select",
                        options: [],
                        required: false,
                    },
                    {
                        name: "teacherId",
                        label: "Teacher",
                        type: "select",
                        options: [],
                        required: false,
                    },
                    {
                        name: "classGroupId",
                        label: "Class",
                        type: "select",
                        options: [],
                        required: false,
                    },
                ],
                defaultValues: {
                    name: "",
                    dayOfWeek: "MONDAY",
                    startTime: {
                        hour: 0,
                        minute: 0,
                        second: 0,
                        nano: 0,
                    },
                    endTime: {
                        hour: 0,
                        minute: 0,
                        second: 0,
                        nano: 0,
                    },
                    isActive: "true",
                    subjectId: "",
                    teacherId: "",
                    classGroupId: "",
                },
            };
        case "subjects":
            return {
                icon: FileText,
                title: "Subject",
                gradient: "from-indigo-600 to-purple-600",
                fields: [
                    {
                        name: "name",
                        label: "Subject Name",
                        type: "text",
                        required: true,
                    },
                    {
                        name: "description",
                        label: "Description",
                        type: "textarea",
                        required: false,
                    },
                ],
                defaultValues: {
                    name: "",
                    description: "",
                },
            };
        case "reasons":
            return {
                icon: AlertCircle,
                title: "Reason",
                gradient: "from-yellow-600 to-orange-600",
                fields: [
                    {
                        name: "name",
                        label: "Reason Name",
                        type: "text",
                        required: true,
                    },
                    {
                        name: "description",
                        label: "Description",
                        type: "textarea",
                        required: false,
                    },
                ],
                defaultValues: {
                    name: "",
                    description: "",
                },
            };
        case "school":
            return {
                icon: Building2,
                title: "School",
                gradient: "from-rose-600 to-pink-600",
                fields: [
                    {
                        name: "name",
                        label: "School Name",
                        type: "text",
                        required: true,
                    },
                    {
                        name: "address",
                        label: "Address",
                        type: "textarea",
                        required: true,
                    },
                    {
                        name: "establishedYear",
                        label: "Established Year",
                        type: "number",
                        required: true,
                    },
                ],
                defaultValues: {
                    name: "",
                    address: "",
                    establishedYear: "",
                },
            };
        default:
            return {
                icon: UserPlus,
                title: "Entity",
                gradient: "from-gray-600 to-gray-700",
                fields: [],
                defaultValues: {},
            };
    }
};

export const getDataConfig = (entityType) => {
    switch (entityType) {
        case "students":
            return {
                params: {
                    page: "1",
                    size: "10",
                    sortBy: "",
                    sortDirection: "",
                },
                filterDto: {
                    search: "",
                    classGroupId: "",
                    status: "",
                    enrollmentDateFrom: "",
                    enrollmentDateTo: "",
                },
            };
        case "teachers":
            return {
                params: {
                    page: "1",
                    size: "10",
                    sortBy: "",
                    sortDirection: "",
                },
                filterDto: {
                    search: "",
                    classGroupId: "",
                    status: "",
                    enrollmentDateFrom: "",
                    enrollmentDateTo: "",
                },
            };
        case "admins":
            return {
                params: {
                    search: "",
                    userStatus: "",
                    hiredDateFrom: "",
                    hiredDateTo: "",
                    dateOfBirthFrom: "",
                    dateOfBirthTo: "",
                    page: "1",
                    size: "10",
                    sortBy: "",
                    sortDirection: "",
                },
            };
        case "classes":
            return {
                params: {
                    search: "",
                    academicYear: "",
                    teacherId: "",
                    page: "1",
                    size: "10",
                    sortBy: "",
                    sortDirection: "",
                },
            };
        case "lessons":
            return {
                params: {
                    page: "1",
                    size: "10",
                    sortBy: "",
                    sortDirection: "",
                },
                filterDto: {
                    search: "",
                    dayOfWeek: "",
                    subjectId: "",
                    teacherId: "",
                    classGroupId: "",
                    startTimeFrom: {
                        hour: 0,
                        minute: 0,
                        second: 0,
                        nano: 0,
                    },
                    startTimeTo: {
                        hour: 0,
                        minute: 0,
                        second: 0,
                        nano: 0,
                    },
                    isActive: true,
                },
            };
        case "subjects":
            return {
                params: {
                    page: "1",
                    siez: "10",
                    sortBy: "",
                    sortDirection: "",
                },
                filterDto: {
                    name: "string",
                    description: "string",
                },
            };
        case "reasons":
            return {
                params: {
                    page: "1",
                    siez: "10",
                    sortBy: "",
                    sortDirection: "",
                },
                filterDto: {
                    name: "string",
                    description: "string",
                },
            };
        default:
            break;
    }
};

export const status = [
    {
        value: "ACTIVE",
        label: "ACTIVE",
    },
    {
        value: "BLOCK",
        label: "BLOCK",
    },
];

export const isActive = [
    {
        value: "false",
        label: "false",
    },
    {
        value: "true",
        label: "true",
    },
];

export const datOfWeek = [
    {
        value: "MONDAY",
        label: "MONDAY",
    },
    {
        value: "TUESDAY",
        label: "TUESDAY",
    },
    {
        value: "WEDNESDAY",
        label: "WEDNESDAY",
    },
    {
        value: "THURSDAY",
        label: "THURSDAY",
    },
    {
        value: "FRIDAY",
        label: "FRIDAY",
    },
    {
        value: "SATURDAY",
        label: "SATURDAY",
    },
    {
        value: "SUNDAY",
        label: "SUNDAY",
    },
];
