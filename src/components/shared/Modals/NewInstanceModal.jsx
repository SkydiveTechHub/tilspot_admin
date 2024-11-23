// import { Modal } from 'antd';
// import React, { useState } from 'react';
// import { BlackText, GrayText } from '../typograph';
// import AddInstanceModal from './AddInstanceModal';

// const NewInstanceModal = ({ title, openModal, handleOk, handleCancel }) => {
//   const [secondModalOpen, setSecondModalOpen] = useState(false);

//   return (
//     <>
//       <Modal
//         className="basic-modal"
//         title={title}
//         open={openModal}
//         onOk={handleOk}
//         onCancel={() => {
//           handleCancel();
//         }}
//       >
//         <div className="w-full h-[80%] flex justify-center items-center flex-col gap-4">
//           <img src="/images/warning.png" alt="Instance welcome image" />
//           <BlackText
//             style="font-[700]"
//             text="Welcome to Your New Instance!"
//           />
//           <GrayText
//             style="font-[400] text-center"
//             text="Welcome to instances, where you choose a service to go with each one: Notifications, OTP, or Chatbot. Each instance lets you manage messages and notifications. You start with 10 free monthly messages, with more available based on your subscription package."
//           />
//           <button className="btn-primary text-primary underline" onClick={() => {
//             setSecondModalOpen(true)
//             handleCancel()
//             }}>
//             Click here to continue
//           </button>
//         </div>
//       </Modal>

//       <AddInstanceModal
//                 openModal={secondModalOpen}
//                 handleCancel={()=>setSecondModalOpen(false)}
//                 handleOk={()=>setSecondModalOpen(false)}
//             />
//     </>
//   );
// };

// export default NewInstanceModal;
