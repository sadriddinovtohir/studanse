import { studentCreate, studentDelete, studentUpdate } from "@/service/student";
import { teacherCreate, teacherDelete, teacherUpdate } from "@/service/teacher";
import { adminCreate, adminDelete, adminUpdate } from "@/service/admin";
import {
  classGroupCreate,
  classGroupDelete,
  classGroupUpdate,
} from "@/service/class";
import { lessonCreate, lessonDelete, lessonUpdate } from "@/service/lesson";
import { subjectCreate, subjectDelete, subjectUpdate } from "@/service/subject";
import { reasonCreate, reasonDelete, reasonUpdate } from "@/service/reason";
import { schoolMineUpdate } from "@/service/school";

export const MUTATION_CONFIG = {
  Students: {
    create: studentCreate,
    update: (id) => (data) => studentUpdate(id, data),
    delete: (id) => studentDelete(id),
    invalidateKeys: () => ["students-all"],
    successMessage: (action) => {
      if (action === "create") return "Student yaratildi!";
      if (action === "update") return "Student yangilandi!";
      if (action === "delete") return "Student o'chirildi!";
    },
  },
  Teachers: {
    create: teacherCreate,
    update: (id) => (data) => teacherUpdate(id, data),
    delete: (id) => teacherDelete(id),
    invalidateKeys: () => ["teacher-all"],
    successMessage: (action) => {
      if (action === "create") return "Teacher yaratildi!";
      if (action === "update") return "Teacher yangilandi!";
      if (action === "delete") return "Teacher o'chirildi!";
    },
  },
  Admins: {
    create: adminCreate,
    update: (id) => (data) => adminUpdate(id, data),
    delete: (id) => adminDelete(id),
    invalidateKeys: () => ["admin-all"],
    successMessage: (action) => {
      if (action === "create") return "Admin yaratildi!";
      if (action === "update") return "Admin yangilandi!";
      if (action === "delete") return "Admin o'chirildi!";
    },
  },
  // class-group da id kelmagani uchun, update va delete ishlamaydi.
  Classes: {
    create: classGroupCreate,
    // update: (id) => (data) => classGroupUpdate(id, data),
    // delete: (id) => classGroupDelete(id),
    invalidateKeys: () => ["class-group"],
    successMessage: (action) => {
      if (action === "create") return "Class group yaratildi!";
      if (action === "update") return "Class group yangilandi!";
      if (action === "delete") return "Class group o'chirildi!";
    },
  },
  Lessons: {
    create: lessonCreate,
    update: (id) => (data) => lessonUpdate(id, data),
    delete: (id) => lessonDelete(id),
    invalidateKeys: () => ["lesson-all"],
    successMessage: (action) => {
      if (action === "create") return "Lesson yaratildi!";
      if (action === "update") return "Lesson yangilandi!";
      if (action === "delete") return "Lesson o'chirildi!";
    },
  },
  Subjects: {
    create: subjectCreate,
    update: (id) => (data) => subjectUpdate(id, data),
    delete: (id) => subjectDelete(id),
    invalidateKeys: () => ["subject-all"],
    successMessage: (action) => {
      if (action === "create") return "Subject yaratildi!";
      if (action === "update") return "Subject yangilandi!";
      if (action === "delete") return "Subject o'chirildi!";
    },
  },
  Reasons: {
    create: reasonCreate,
    update: (id) => (data) => reasonUpdate(id, data),
    delete: (id) => reasonDelete(id),
    invalidateKeys: () => ["reason-all"],
    successMessage: (action) => {
      if (action === "create") return "Reason yaratildi!";
      if (action === "update") return "Reason yangilandi!";
      if (action === "delete") return "Reason o'chirildi!";
    },
  },
  School: {
    update: (id) => (data) => schoolMineUpdate(id, data),
    invalidateKeys: () => ["school-mine"],
    successMessage: () => "Admin yangilandi!",
  },
};
