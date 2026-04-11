import { schoolById, schoolMine, schoolsAll } from "@/service/school";
import { adminAll, adminById } from "@/service/admin";
import {
  adminClassesStudents,
  classGroup,
  classGroupAll,
  classGroupById,
  TeacherClasses,
} from "@/service/class";
import { attendancePost, lessonAll, lessonById } from "@/service/lesson";
import { reasonAll, reasonById } from "@/service/reason";
import {
  studentAtechment,
  studentById,
  studentGet,
  studentInfo,
  studentsAll,
} from "@/service/student";
import { subjectAll, subjectById } from "@/service/subject";
import {
  superAdminAll,
  superAdminById,
  superAdminMe,
} from "@/service/super-admin";
import { teacherAdminAll, teacherAll, teacherById } from "@/service/teacher";
import { getUserSettings } from "@/service/user";
import { adminGetInfo, adminInfoStudentID, teacherInfo, teacherStudentsInfo } from "@/service/info";

// school
export const schoolsAllQuery = () => {
  return {
    queryKey: ["schools-all"],
    queryFn: async () => schoolsAll(),
  };
};

export const schoolMineQuery = () => {
  return {
    queryKey: ["school-mine"],
    queryFn: async () => schoolMine(),
  };
};

export const schoolByIdQuery = (id) => {
  return {
    queryKey: ["school", id],
    queryFn: async () => schoolById(id),
  };
};

// system admin
export const superAdminAllQuery = (params) => {
  return {
    queryKey: ["super-admin-all", params],
    queryFn: async () => superAdminAll(params),
  };
};

export const superAdminByIdlQuery = (id) => {
  return {
    queryKey: ["super-admin", id],
    queryFn: async () => superAdminById(id),
  };
};

export const MeUrl = (params) => {
  return {
    queryKey: ["superAdminMeurl", params],
    queryFn: async () => superAdminMe(params),
  };
};
export const userMeQuery = (params) => {
  return {
    queryKey: ["user-me-all", params],
    queryFn: async () => superAdminMe(params),
  };
};
// class
export const classGroupAllQuery = () => {
  return {
    queryKey: ["class-group-all"],
    queryFn: async () => classGroupAll(),
  };
};

export const classGroupQuery = (params) => {
  return {
    queryKey: ["class-group", params],
    queryFn: async () => classGroup(params),
  };
};

export const classGroupByIdQuery = (id) => {
  return {
    queryKey: ["class-group-id"],
    queryFn: async () => classGroupById(id),
  };
};

// students
export const adminClassesstudentsQuery = () => {
  return {
    queryKey: ["admin-classes-students"],
    queryFn: async () => adminClassesStudents(),
  };
};

export const adminInfoGetStudentQuery = (id) => {
  return {
    queryKey: ["admin-student-info-id", id],
    queryFn: async () => adminInfoStudentID(id),
  };
};

export const studentsAllQuery = (params, data) => {
  return {
    queryKey: ["students-all", params, data],
    queryFn: async () => studentsAll(params, data),
  };
};

export const studentQuery = (id) => {
  return {
    queryKey: ["student", id],
    queryFn: async () => studentById(id),
  };
};

/// attendance  in student
export const attendancePostMutation = (payload) => {
  return attendancePost(payload);
};

// teacher
export const teacherAllQuery = (params, data) => {
  return {
    queryKey: ["teacher-all", params, data],
    queryFn: async () => teacherAll(params, data),
  };
};

export const teacherAdminAllQuery = () => {
  return {
    queryKey: ["teacher-admin-all"],
    queryFn: async () => teacherAdminAll(),
  };
};

export const teacherQuery = (id) => {
  return {
    queryKey: ["teacher", id],
    queryFn: async () => teacherById(id),
  };
};

// admin
export const adminAllQuery = (params) => {
  return {
    queryKey: ["admin-all", params],
    queryFn: async () => adminAll(params),
  };
};

export const adminQuery = (id) => {
  return {
    queryKey: ["admin", id],
    queryFn: async () => adminById(id),
  };
};
export const adminInfoQuery = (classId) => {
  // const { classId } = selectedClass;
  return {
    queryKey: ["admin-info", classId],
    queryFn: async () => adminGetInfo(classId),
  };
};

// lesson
export const lessonAllQuery = (params, data) => {
  return {
    queryKey: ["lesson-all", params, data],
    queryFn: async () => lessonAll(params, data),
  };
};

export const lessonQuery = (userId) => {
  return {
    queryKey: ["lesson", userId],
    queryFn: async () => lessonById(userId),
  };
};

// subject
export const subjectAllQuery = (params, data) => {
  return {
    queryKey: ["subject-all", params, data],
    queryFn: async () => subjectAll(params, data),
  };
};

export const subjectQuery = (id) => {
  return {
    queryKey: ["subject", id],
    queryFn: async () => subjectById(id),
  };
};

// reason
export const reasonAllQuery = (params, data) => {
  return {
    queryKey: ["reason-all", params, data],
    queryFn: async () => reasonAll(params, data),
  };
};

export const reasonQuery = (id) => {
  return {
    queryKey: ["reason", id],
    queryFn: async () => reasonById(id),
  };
};

export const student = () => {
  return {
    queryKey: ["getstudent"],
    queryFn: async () => studentGet(),
  };
};

// atichments
export const studentAchievementQuery = () => {
  return {
    queryKey: ["student-achievement"],
    queryFn: async () => studentAtechment(),
  };
};

export const studentDataInfoQuery = () => {
  return {
    queryKey: ["student-data-info"],
    queryFn: async () => studentInfo(),
  };
};

export const teacherClassesstudentsQuery = () => {
  return {
    queryKey: ["Stundents"],
    queryFn: async () => TeacherClasses(),
  };
};

// teacher info

export const teacherInfoQuery = () => {
  return {
    queryKey: ["students-info"],
    queryFn: async () => teacherInfo(),
  };
};

export const teacherStudentsQuery = ()=>{
  return {
    queryKey:["all-students-in-teacher"],
    queryFn:async ()=> teacherStudentsInfo(), 
  }
}

// user settings
export const getUserSettingsQuery = () => {
  return {
    queryKey: ["user-settings"],
    queryFn: async () => getUserSettings(),
  };
};
