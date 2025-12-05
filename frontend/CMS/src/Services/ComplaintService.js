import { getAllComplaints } from "../../../../backend/controllers/admin.controller";
import { assignComplaint } from "../../../../backend/controllers/complaint.controller";
import Api from "./Api";

const  ComplainService = {
//user
createComplaint : (record)=>Api.post('/complaints/create',record),
//user
getMyComplaint : ()=>Api.get('/complaints/my'),

//staff
getAllComplaints : ()=>Api.get('/complaints/staff/all'),

//staff
assignComplaint :( id , staff)=>Api.put(`/complaints/assign/${id}`, {staff}),

//staff
updateStatus : (id , status)=>Api.post(`/complaints/${id}/status`,{status}),

//admin
getAllUser : ()=>Api.get('/admin/users')


}

export default ComplainService;