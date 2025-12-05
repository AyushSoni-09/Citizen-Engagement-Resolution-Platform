import Api from "./Api";


 const AuthService = {
  UserLogin :(record)=> Api.post('/auth/login' , record),
  UserRegister : (record)=> Api.post('/auth/register' , record),
  Logout:()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
  }
}

export default AuthService; 