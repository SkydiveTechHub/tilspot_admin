import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStaffs, getAllTransactions, getOperatorAllTransactions, getOperatorTransactionsByStatus, getProviderByCategory, getTransactionsByCategory } from "../../../../store/actions";
import { toast } from "react-toastify";
import { Section } from "../../../../components/shared/container/container";
import TransactionsTable from "../../../../components/dashboardComponents/transactions";
import { Button, Dropdown } from "antd";
import { Label } from "../../../../components/shared/typograph";
import { checkCategory } from "../../../../store/reducers/providerSlice";

const OperatorTransactions = () => {
  const dispatch = useDispatch();
  const { operatorTransactions } = useSelector((state) => state.staff);
  const { providers, categories } = useSelector((state) => state.providers);

  const [filterType, setFilterType] = useState({ text: "All", value: "all" });
  const [filterOption, setFilterOption] = useState({ text: "All", value: "all" });
  const [filterOptionList, setFilterOptionList] = useState([]);
  const [providerOptionList, setProviderOptionList] = useState([]);
  const [providerOption, setProviderOption] = useState({ text: "All", value: "all" });

  console.log(operatorTransactions)

  const fetchTransaction = async () => {
    try {
      await dispatch(getOperatorAllTransactions(1));
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const fetchTransactionByFilter = async (value) => {
    if (value === "All") {
      getOperatorAllTransactions();
      return;
    }else{
      try {
        await dispatch(getOperatorTransactionsByStatus(value));
      } catch (error) {
        toast.error("Something went wrong");
      }      
    }

  };

  useEffect(() => {
    fetchTransaction();
  }, []);


  useEffect(() => {

    const performFetch =  async() =>{
      if (filterOption.value) {
        try {
          await dispatch(fetchTransactionByFilter(filterOption.value));
        } catch (error) {
          toast.error("Something went wrong");
        }
      }      
    }

    performFetch()


  }, [filterOption]);

  const filterItems = [
    { key: "1", label: <div onClick={() => setFilterOption({ text: "Approved", value: "approved" })}>Approved</div> },
    { key: "2", label: <div onClick={() => setFilterOption({ text: "Rejected", value: "rejected" })}>Rejected</div> },
    { key: "3", label: <div onClick={() => setFilterOption({ text: "Pending", value: "pending" })}>Pending</div> },
    { key: "4", label: <div onClick={() => setFilterOption({ text: "All", value: "all" })}>All</div> },
  ];

  return (
    <div>
      <Section title="">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col">
            <Label text="Filter By Status:" />
            <Dropdown menu={{ items: filterItems }} placement="bottomRight">
              <Button>
                <span className="font-mont font-semibold">{filterOption.text}</span>
              </Button>
            </Dropdown>
          </div>
        </div>

        <TransactionsTable columns={columns} data={operatorTransactions} />
      </Section>
    </div>
  );
};

export default OperatorTransactions;

const columns = [
  { title: "Category", dataIndex: "billInfo", key: "category", render: (record) => <p>{record?.categoryInfo?.name}</p> },
  { title: "Provider", dataIndex: "billInfo", key: "provider", render: (record) => <p>{record?.providerInfo?.name}</p> },
  { title: "Amount", dataIndex: "amount", key: "amount" },
  { title: "Created Date", dataIndex: "billInfo", key: "createdDate", render: (record) => <p>{record?.createdAt?.split("T")[0]}</p> },
  { title: "Status", dataIndex: "status", key: "status" },
];
