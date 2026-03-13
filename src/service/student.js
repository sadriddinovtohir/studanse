import { request } from "@/config/request";

export const studentsAll = (params, data) => {
    return request({ method: "GET", url: "/student", params, data });
};

export const studentCreate = (data) => {
    return request({ method: "POST", url: "/student", data });
};

export const studentUpdate = (id, data) => {
    return request({ method: "PUT", url: `/student/${id}`, data });
};

export const studentDelete = (id) => {
    return request({ method: "DELETE", url: `/student/${id}` });
};

export const studentById = (id) => {
    return request({ method: "GET", url: `/student/${id}` });
};
//get sutdent data 
export const studentGet = () =>{
    return request({method:"GET", url:"/student/info"})
}