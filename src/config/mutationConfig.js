import { adminCreate, adminDelete, adminUpdate } from "@/service/admin";
import {
    classGroupCreate,
    classGroupDelete,
    classGroupUpdate,
} from "@/service/class";
import { lessonCreate, lessonDelete, lessonUpdate } from "@/service/lesson";
import { reasonCreate, reasonDelete, reasonUpdate } from "@/service/reason";
import { schoolMineUpdate } from "@/service/school";
import { studentCreate, studentDelete, studentUpdate } from "@/service/student";
import { subjectCreate, subjectDelete, subjectUpdate } from "@/service/subject";
import { teacherCreate, teacherDelete, teacherUpdate } from "@/service/teacher";

export const MUTATION_CONFIG = {
    Students: {
        create: studentCreate,
        update: (id) => (data) => studentUpdate(id, data),
        delete: (id) => studentDelete(id),
        invalidateKeys: () => ["students-all"],
        successMessage: (action, id) => {
            if (action === "delete") return "Student o'chirildi!";
            return id ? "Student yangilandi!" : "Student yaratildi!";
        },
    },
    Teachers: {
        create: teacherCreate,
        update: (id) => (data) => teacherUpdate(id, data),
        delete: (id) => teacherDelete(id),
        invalidateKeys: () => ["teacher-all"],
        successMessage: (action, id) => {
            if (action === "delete") return "Teacher o'chirildi!";
            return id ? "Teacher yangilandi!" : "Teacher yaratildi!";
        },
    },
    Admins: {
        create: adminCreate,
        update: (id) => (data) => adminUpdate(id, data),
        delete: (id) => adminDelete(id),
        invalidateKeys: () => ["admin-all"],
        successMessage: (action, id) => {
            if (action === "delete") return "Admin o'chirildi!";
            return id ? "Admin yangilandi!" : "Admin yaratildi!";
        },
    },
    // class-group da id kelmagani uchun, update va delete ishlamaydi.
    Classes: {
        create: classGroupCreate,
        // update: (id) => (data) => classGroupUpdate(id, data),
        // delete: (id) => classGroupDelete(id),
        invalidateKeys: () => ["class-group"],
        successMessage: (action, id) => {
            if (action === "delete") return "Class group o'chirildi!";
            return id ? "Class group yangilandi!" : "Class group yaratildi!";
        },
    },
    Lessons: {
        create: lessonCreate,
        update: (id) => (data) => lessonUpdate(id, data),
        delete: (id) => lessonDelete(id),
        invalidateKeys: () => ["lesson-all"],
        successMessage: (action, id) => {
            if (action === "delete") return "Lesson o'chirildi!";
            return id ? "Lesson yangilandi!" : "Lesson yaratildi!";
        },
    },
    Subjects: {
        create: subjectCreate,
        update: (id) => (data) => subjectUpdate(id, data),
        delete: (id) => subjectDelete(id),
        invalidateKeys: () => ["subject-all"],
        successMessage: (action, id) => {
            if (action === "delete") return "Subject o'chirildi!";
            return id ? "Subject yangilandi!" : "Subject yaratildi!";
        },
    },
    Reasons: {
        create: reasonCreate,
        update: (id) => (data) => reasonUpdate(id, data),
        delete: (id) => reasonDelete(id),
        invalidateKeys: () => ["reason-all"],
        successMessage: (action, id) => {
            if (action === "delete") return "Reason o'chirildi!";
            return id ? "Reason yangilandi!" : "Reason yaratildi!";
        },
    },
    School: {
        update: (id) => (data) => schoolMineUpdate(id, data),
        invalidateKeys: () => ["school-mine"],
        successMessage: () => "Admin yangilandi!",
    },
};
