import CryptoJS from 'crypto-js';



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
          console.log(errors.email)
          }        
      }
      if('instance_name' in values){
        const nameRegex = /^[A-Za-z]{9,}$/;
        const isValidName = (name) => nameRegex.test(name);

          if (!values.instance_name) {
          errors.email = 'Instance Name is required';
          } else if (!isValidName(values.instance_name)) {
              
            errors.email = 'Instance name is invalid';
            console.log(errors.instance_name)
          }        
      }
      // Password validation
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
      }      
      // Confirm Password validation
      if (!values.c_password) {
        errors.c_password = 'Password is required';
      } else if (values.c_password !== values.password) {
        errors.c_password = 'Password does not match';
      }      
    }
    // Email validation


  console.log(errors)
    return errors;
  };

  const stringChunker = (str, chunkSize) =>{
    const chunks = []
    for (let i=0; i<str.length; i += chunkSize){
      const chunk = str.substring(i, i + chunkSize)
      chunks.push(chunk)
    
    }
    console.log(chunks)
    return chunks
  }

//   export const encrypter = (data) =>{

//     const secretKey = ['pE2a', 'Dl6z']

//     let encryptedData = '';
//     const data_string = JSON.stringify(data)
//     const encodedString = btoa(data_string)
//     const suffled_data = (stringChunker(encodedString, 4)).slice().reverse()

//     suffled_data.unshift(secretKey[0])
//     suffled_data.push(secretKey[1])
//     encryptedData = suffled_data.join('')
//     console.log(suffled_data)
//     return encryptedData
//   }

// export const decrypter = (data) => {
//   let decryptedData = '';
//   try{
//     const suffled_data = (stringChunker(data, 4)).slice().reverse()
//     suffled_data.shift()
//     suffled_data.pop()
//     suffled_data.slice().reverse()
//     const encryptedData = (suffled_data.join(''))
//     console.log(encryptedData)
//     const decodedString = atob(encryptedData)
//     const plainData = JSON.parse(decodedString)
//     decryptedData = plainData
//   }catch (error){
//     console.error('there is error', error)
//   }
//   return decryptedData;
// }


//   export const encrypter = (data) =>{
//     let encryptedData = '';
//     const secretKey = 'this_is_a_valid_AES_key_32_bytes'; 
//     // const iv = CryptoJS.lib.WordArray.random(16); 
//     console.log('Data:', data);
  
//     const jsonData = JSON.stringify(data);
  
//     const IV = 1234567890123456;
//     const options = { iv: IV };
//     // const token = CryptoJS.AES.encrypt(jsonData, secretKey, options).toString();
//     const token = CryptoJS.AES.encrypt(jsonData, secretKey, options).toString();
//     console.log(token)
//     console.log(IV)
//     encryptedData = token;
    
  
//     return encryptedData;
//   }


  
// export const decrypter = (encryptedData) => {
//   let decryptedData = '';
//   const secretKey = 'this_is_a_valid_AES_key_32_bytes'; 

//   // Decrypt the data
//   const bytes = CryptoJS.AES.decrypt('7zszvfYXQdaNF45Cp16Xp66uqBBw4FtaVNl5klc0YTmr1v4xJeAFrgo+rRNa4Cp3eohKTfU55c1vsmy4B+fose3qvkTbNB/D7S2AWasj5u8=', secretKey);
//   const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

//   try {
//     // Parse the decrypted JSON string
//     decryptedData = JSON.parse(decryptedString);
//   } catch (error) {
//     console.error('Failed to parse decrypted data:', error.message);
//   }

//   return decryptedData;
// }

  


export const encrypter = (data) => {
  const secretKey = 'this_is_a_valid_AES_key_32_bytes';
  const iv = CryptoJS.enc.Utf8.parse('1234567891234567'); 
  const jsonData = JSON.stringify(data);

  const encrypted = CryptoJS.AES.encrypt(jsonData, CryptoJS.enc.Utf8.parse(secretKey), {
    iv: iv,
    mode: CryptoJS.mode.CBC, 
    padding: CryptoJS.pad.Pkcs7, 
  }
);



  return {
    encryptedData: encrypted.toString(),
  };
};


export const decrypter = (encryptedObj) => {
  console.log(encryptedObj)
  const secretKey = 'this_is_a_valid_AES_key_32_bytes';
  const iv = CryptoJS.enc.Utf8.parse('1234567891234567');
  const { encryptedData } = encryptedObj; 

  const bytes = CryptoJS.AES.decrypt('BANzKvDNTtu7NZrHcJ+rMtfoAxkGGd0I/r/f3Sbrghqbmfm02IlkWKhppSIX94q98u/K/sR5DU/crz5yPkaLPg==', CryptoJS.enc.Utf8.parse(secretKey), {
    iv: iv, 
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }
);

  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

  try {
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Failed to parse decrypted data:', error.message);
    return null;
  }
};
