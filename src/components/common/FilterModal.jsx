import React from "react";
import RadioButton from "./RadioButton";

function FilterModal({ setModalOpen, onFilter, comp, title, rangeValue, isYear, isMonth }) {
  return (
    <div className="relative z-[999]">
      <div className="w-[255px] bg-white rounded-[10px] shadow-[0_5px_16px_rgba(0,0,0,0.2)] mt-2 pb-2 relative">
        <div className="flex justify-between items-center px-4 py-3">
          <h3 className="text-base mb-0">{title ? title : "Filter"}</h3>
          {/* <img src="/assets/images/sliders.svg" alt="filter icon" /> */}
        </div>
        <hr />
        {comp ? (
          comp
        ) : (
          <RadioButton
            onFilter={onFilter}
            rangeValue={rangeValue}
            isYear={isYear}
            isMonth={isMonth}
          />
        )}
      </div>

      {/* <div
        className="fixed top-0 left-0 w-full h-screen bg-gray-800 opacity-70 z-[999]"
        onClick={() => setModalOpen(false)}
      ></div> */}
    </div>
  );
}

export default FilterModal;
