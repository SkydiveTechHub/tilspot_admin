import React, { useState, useRef } from "react";
// import StyledButton from "./btn";
import FilterModal from "./FilterModal";
import { PryButton } from "../shared/button";
import { Button } from "antd";
import { IoFilterOutline } from "react-icons/io5";

function Filter({ onFilter, title, icon, compTitle, comp, rangeValue, isYear, isMonth }) {
  const ref = useRef();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div ref={ref} className="h-10 float-right mr-4 flex items-center gap-2">
      <Button
        // buttonStyle="btn--gray--outline"
        // buttonSize="btn--small"
        // className="flex items-center gap-6 text-base relative"
        onClick={() => setModalOpen(true)}
      >
        {title ? <span className="ml-[-8px]">{title}</span> : 'Filter'}

        {icon ? (
          <span className="absolute right-1">{icon}</span>
        ) : (
          null
        )}
      </Button>

      {modalOpen && (
        <div className="relative">
          <div className="absolute right-0">
            <FilterModal
              isMonth={isMonth}
              isYear={isYear}
              comp={comp}
              title={compTitle}
              setModalOpen={setModalOpen}
              onFilter={onFilter}
              rangeValue={rangeValue}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
