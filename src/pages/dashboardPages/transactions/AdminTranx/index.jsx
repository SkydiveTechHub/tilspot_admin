import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStaffs, getAllTransactions, getProviderByCategory, getTransactionsByCategory } from "../../../../store/actions";
import { toast } from "react-toastify";
import { Section } from "../../../../components/shared/container/container";
import TransactionsTable from "../../../../components/dashboardComponents/transactions";
import { Button, Dropdown } from "antd";
import { Label } from "../../../../components/shared/typograph";
import { checkCategory } from "../../../../store/reducers/providerSlice";

const AdminTransactions = () => {
    const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };
  const dispatch = useDispatch();
  const { transactions, totalAmount } = useSelector((state) => state.staff);
  const { providers, categories } = useSelector((state) => state.providers);
  const { staffs } = useSelector((state) => state.staff);
  const [filterDate, setFilterDate] = useState({
    start: "2010-01-01",
    end: d,
  })
  const [filterType, setFilterType] = useState({ text: "All", value: "all" });
  const [filterOption, setFilterOption] = useState({ text: "Select Options", value: "all" });
  const [filterOptionList, setFilterOptionList] = useState([]);
  const [providerOptionList, setProviderOptionList] = useState([]);
  const [providerOption, setProviderOption] = useState({ text: "Select Options", value: "all" });

  const fetchTransaction = async () => {
    try {
      await dispatch(getAllTransactions());
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const fetchTransactionByFilter = async (type, value, date) => {
    if (type === "all") {
      fetchTransaction();
      return;
    }

    try {
      await dispatch(getTransactionsByCategory({ type, query: value, ...date }));
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  useEffect(() => {
    const baseOptions = [];

    if ((filterType.value === "category" || filterType.value === "provider")) {
      if (categories?.length > 0) {
        const categoryOptions = categories.map((i, id) => ({
          key: `${id + 2}`,
          label: (
            <div onClick={() => { 
              setFilterOption({ text: i.name, value: i._id });
              dispatch(getProviderByCategory(i._id)); 
            }}>
              {i.name}
            </div>
          ),
        }));

        setFilterOptionList([...baseOptions, ...categoryOptions]);
      } else {
        dispatch(checkCategory());
      }
    }  else if (filterType.value === "operator") {
      console.log(staffs)
      if (staffs?.operators?.length > 0) {
        const staffsOptions = staffs?.operators?.map((i, id) => ({
          key: `${id + 2}`,
          label: (
            <div onClick={() => setFilterOption({ text: `${i.first_name} ${i.last_name}`, value: i._id })}>
              {i.first_name} {i.last_name}
            </div>
          ),
        }));

        setFilterOptionList([...baseOptions, ...staffsOptions]);
      } else {
        dispatch(getAllStaffs());
      }
    } else if (filterType.value === "status") {
      const items = [
        { key: "1", label: <div onClick={() => setFilterOption({ text: "Approved", value: "Approved" })}>Approved</div> },
        { key: "2", label: <div onClick={() => setFilterOption({ text: "Rejected", value: "Rejected" })}>Rejected</div> },
        { key: "3", label: <div onClick={() => setFilterOption({ text: "Pending", value: "Pending" })}>Pending</div> },
      ];

      setFilterOptionList([...baseOptions, ...items]);
    } else {
      setFilterOptionList(baseOptions);
    }


    if (filterType.value === "provider" && categories) {
      if (providers?.length > 0) {
        const providersOptions = providers.map((i, id) => ({
          key: `${id + 2}`,
          label: (
            <div onClick={() => setProviderOption({ text: i.name, value: i._id })}>
              {i.name}
            </div>
          ),
        }));

        setProviderOptionList([...baseOptions, ...providersOptions]);
      } else {
        dispatch(checkCategory());
        dispatch(getProviderByCategory(categories[0]._id));
      }
    }
  }, [filterType, categories, staffs, providers]);

  useEffect(()=>{
    setFilterOption({ text: "Select Options", value: "all" })

    if(filterType.value === 'all'){
      fetchTransactionByFilter('all', "");
    }
  }, [filterType])

  useEffect(() => {
    console.log(filterDate)
    if (filterOption.value !== "all" && filterType.value !== "provider" ) {
      fetchTransactionByFilter(filterType.value, filterOption.value, filterDate);
    }
    if (filterType.value === "provider" && providerOption.value !== 'all' && filterOption.value !== "all") {
      fetchTransactionByFilter(filterType.value, providerOption.value, filterDate);
    }
  }, [filterOption, providerOption, filterDate]);


  const filterItems = [
    { key: "1", label: <div onClick={() => setFilterType({ text: "All", value: "all" })}>All</div> },
    { key: "2", label: <div onClick={() => setFilterType({ text: "Category", value: "category" })}>Category</div> },
    { key: "3", label: <div onClick={() => { setFilterType({ text: "Provider", value: "provider" }); dispatch(checkCategory()) }}>Provider</div> },
    { key: "4", label: <div onClick={() => setFilterType({ text: "Operator", value: "operator" })}>Operator</div> },
    { key: "5", label: <div onClick={() => setFilterType({ text: "Status", value: "status" })}>Status</div> },
  ];


  const handleFilter =(date)=>{
    setFilterDate(date)
  }

  return (
    <div>
      <Section title="">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col">
            <Label text="Filter Type" />
            <Dropdown menu={{ items: filterItems }} placement="bottomRight">
              <Button>
                <span className="font-mont font-semibold">{filterType.text}</span>
              </Button>
            </Dropdown>
          </div>

          {filterType.value !== "all" && (
            <div className="flex flex-col">
              <Label text="Filter Options" />
              <Dropdown menu={{ items: filterOptionList }} placement="bottomRight">
                <Button>
                  <span className="font-mont font-semibold">{filterOption.text}</span>
                </Button>
              </Dropdown>
            </div>
          )}

          {filterType.value === "provider" && (
            <div className="flex flex-col">
              <Label text="Provider Options" />
              <Dropdown menu={{ items: providerOptionList }} placement="bottomRight">
                <Button>
                  <span className="font-mont font-semibold">{providerOption.text}</span>
                </Button>
              </Dropdown>
            </div>
          )}
        </div>

        <p>Total Amount: <span className="font-bold">N {totalAmount}</span></p>

        <TransactionsTable columns={columns} data={transactions} hasFilter={true} handleFilter={handleFilter}/>
      </Section>
    </div>
  );
};

export default AdminTransactions;

const columns = [
  { title: "Category", dataIndex: "billInfo", key: "category", render: (record) => <p>{record?.categoryInfo?.name}</p> },
  { title: "Provider", dataIndex: "billInfo", key: "provider", render: (record) => <p>{record?.providerInfo?.name}</p> },
  { title: "Amount", dataIndex: "amount", key: "amount" },
  { title: "Created Date", dataIndex: "billInfo", key: "createdDate", render: (record) => <p>{record?.createdAt?.split("T")[0]}</p> },
  { title: "Status", dataIndex: "status", key: "status" },
];
