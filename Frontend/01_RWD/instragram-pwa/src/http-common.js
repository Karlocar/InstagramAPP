import axios from "axios";


const axiosInstagram = axios.create({
    baseURL: "https://kperic-001-site1.ctempurl.com/api/v1/Osoba",
    headers: {
        'Content-type': 'application/json',
        
      }
    
    });
    
   
    
export default axiosInstagram;
