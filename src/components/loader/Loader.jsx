import React from 'react'

const Loader = () => {
    return (
      <>
        <div className="fixed left-0 top-0 w-full h-screen bg-gray-800 opacity-70 z-[100000000]"></div>
        <div className="absolute left-0 w-full h-full overflow-hidden flex justify-center top-0 items-center z-[10000000000]">
          <div style={{borderTopColor:'transparent'}} className="w-16 h-16 border-4 border-white border-solid rounded-full z-[10000000000] animate-spin"></div>
        </div>
      </>
    );
  };
  
  export default Loader;
  
