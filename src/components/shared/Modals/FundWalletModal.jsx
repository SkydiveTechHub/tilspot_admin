// import React, { useEffect, useState } from 'react';
// import FormInput from '../FormInput';
// import { AuthButton } from '../button';
// import useForm from '../../../hooks/useForm';
// import { Modal } from 'antd';
// import FundOptionsModal from './FundOptionsModal';

// const initialState = {
//   amount: '',
//   message: '',
// };

// const FundWalletModal = ({ title, openModal, handleOk, handleCancel }) => {
//   const [active, setActive] = useState(false);
//   const [secondModalOpen, setSecondModalOpen] = useState(false);

//   const { values, handleChange, resetForm, errors } = useForm(initialState);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', values);
//     handleOk(); // Optional: close modal on submit
//     resetForm();
//   };

//   const validate = () => {
//     setActive(!!values.name && !!values.type);
//   };

//   useEffect(() => {
//     validate();
//   }, [values]); 

//   return (
//     <>
//     <FundOptionsModal
//       openModal={secondModalOpen}
//       handleCancel={()=>setSecondModalOpen(false)}
//       handleOk={()=>setSecondModalOpen(false)}
//     />

    
//     <Modal
//       className="basic-modal"
//       title={'Fund Wallet'}
//       open={openModal}
//       onOk={handleOk}
//       onCancel={handleCancel}
//     >
//       <form className='mt-6 space-y-6' onSubmit={handleSubmit}>
//         <FormInput
//           label="Amount to Pay"
//           type="text"
//           name="amount"
//           value={values.amount}
//           onChange={handleChange}
//           placeholder="amount"
//           error={errors?.amount}
//         />
//         <FormInput
//           label="Message Number"
//           type="text"
//           name="message"
//           disabled={true}
//           value={values.message}
//           onChange={handleChange}
//           placeholder=""
//           error={errors?.message}
//         />
//         <div onClick={()=>{
//             setSecondModalOpen(true)
//             handleCancel()
//           }}>
//           <AuthButton value="Continue to Payment" />  
//         </div>
        
//       </form>
//     </Modal>    </>

//   );
// };

// export default FundWalletModal;
