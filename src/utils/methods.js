export const validator = (values) => {
    let errors = {};
  
    if (values){

      if('firstName' in values){
        if (!values.firstName) {
          errors.firstName = 'First name is required';
          }
      }
      if('lastName' in values){
        if (!values.lastName) {
          errors.lastName = 'Last name is required';
          }
      }

      // email validation     
      if('email' in values){
          if (!values.email) {
          errors.email = 'Email is required';
          } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            
          errors.email = 'Email address is invalid';
          }        
      }
      if('instance_name' in values){
        const nameRegex = /^[A-Za-z]{9,}$/;
        const isValidName = (name) => nameRegex.test(name);

          if (!values.instance_name) {
          errors.email = 'Instance Name is required';
          } else if (!isValidName(values.instance_name)) {
              
            errors.email = 'Instance name is invalid';
    
          }        
      }
      // Password validation
      if("password" in values){
        if (!values.password) {
          errors.password = 'Password is required';
        } else if (values.password.length < 8) {
          errors.password = 'Password must be at least 6 characters long';
        }          
      }
      if("c_password" in values){
        if (!values.c_password) {
          errors.c_password = 'Password is required';
        } else if (values.c_password !== values.password) {
          errors.c_password = 'Password does not match';
        }           
      }
   
      
    
 
  
    }
    // Email validation

    return errors;
  };


export function formatReadableDate(dateInput) {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "Invalid Date";

  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}


 