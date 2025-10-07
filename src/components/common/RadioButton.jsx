import { Col, DatePicker, Radio, Row, Space } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";

const dateFormat = "YYYY-MM-DD";

const FilterOptions = {
  all: {
    label: "All",
    date: { start: "2010-01-01", end: moment().format(dateFormat) },
  },
  yesterday: {
    label: "Yesterday",
    date: {
      start: moment().subtract(1, "days").format(dateFormat),
      end: moment().subtract(1, "days").format(dateFormat),
    },
  },
  lastWeek: {
    label: "Last Week",
    date: {
      start: moment().startOf("week").subtract(7, "days").format(dateFormat),
      end: moment().endOf("week").subtract(7, "days").format(dateFormat),
    },
  },
  lastMonth: {
    label: "Last Month",
    date: {
      start: moment().subtract(1, "months").startOf("month").format(dateFormat),
      end: moment().subtract(1, "months").endOf("month").format(dateFormat),
    },
  },
  thirtyDays: {
    label: "This Month",
    date: {
      start: moment().startOf("month").format(dateFormat),
      end: moment().endOf("month").format(dateFormat),
    },
  },
};

const RadioButton = ({ onFilter, rangeValue, isYear, isMonth, setModalOpen }) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const FilterMonthOptions = {
    thisMonth: { label: "This Month", date: currentMonth + 1 },
    lastMonth: { label: "Last Month", date: currentMonth },
    twoMonthsAgo: { label: "2 Months Ago", date: currentMonth - 1 },
  };

  const FilterYearOptions = {
    thisYear: { label: "This Year", date: currentYear },
    lastYear: { label: "Last Year", date: currentYear - 1 },
    twoYearsAgo: { label: "2 Years Ago", date: currentYear - 2 },
  };

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [value, setValue] = useState("");

  const handleRadioChange = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue)
    setValue(selectedValue);

    let date;

    if (isYear) {
      date = FilterYearOptions[selectedValue]?.date;
    } else if (isMonth) {
      date = FilterMonthOptions[selectedValue]?.date;
    } else {
      date = FilterOptions[selectedValue]?.date;
    }

    if (selectedValue !== "dateRange") {
      console.log(date)
      onFilter(date);
      setModalOpen(false)
    }
  };

  const handleDateRange = (type, dateString) => {
    const formattedDate = moment(dateString).format(dateFormat);

    if (isYear || isMonth) {
      const val = isMonth && dateString?.includes("-") 
        ? Number(dateString.split("-")[1]) 
        : Number(dateString);
      onFilter(val);
      setModalOpen(false)
    } else {
      if (type === "start") setFrom(formattedDate);
      if (type === "end") setTo(formattedDate);
    }
  };

  useEffect(() => {
    if (from && to && value === "dateRange" && !isYear && !isMonth) {
      onFilter({ start: from, end: to });
      setModalOpen(false)
    }
  }, [from, to]);

  const renderRadioItems = () => {
    const source = isYear
      ? FilterYearOptions
      : isMonth
      ? FilterMonthOptions
      : FilterOptions;

    return Object.keys(source).map((key) => {
      const { label } = source[key];
      return (
        <Radio key={key} value={key} className="capitalize mb-2 text-sm font-medium">
          {label}
        </Radio>
      );
    });
  };

  const renderCustomDatePicker = () => {
    if (!value || value !== "dateRange") return null;

    if (isYear) {
      return (
        <DatePicker
          picker="year"
          onChange={(_, dateString) => handleDateRange("year", dateString)}
        />
      );
    }

    if (isMonth) {
      return (
        <DatePicker
          picker="month"
          onChange={(_, dateString) => handleDateRange("month", dateString)}
        />
      );
    }

    return (
      <Row gutter={12}>
        <Col span={12}>
          <Space direction="vertical" size={6}>
            <div className="text-xs text-gray-600">From</div>
            <DatePicker
              format={dateFormat}
              onChange={(_, dateString) => handleDateRange("start", dateString)}
              className="w-full"
            />
          </Space>
        </Col>
        <Col span={12}>
          <Space direction="vertical" size={6}>
            <div className="text-xs text-gray-600 ml-3">To</div>
            <div className="ml-3">
              <DatePicker
                format={dateFormat}
                onChange={(_, dateString) => handleDateRange("end", dateString)}
                className="w-full"
              />
            </div>
          </Space>
        </Col>
      </Row>
    );
  };

  return (
    <div className="min-h-[40vh] z-[9999999999999]">
      <Radio.Group onChange={handleRadioChange} value={value}>
        <div className="ml-2 text-base">
          <Space direction="vertical">
            {renderRadioItems()}

            <Radio value="dateRange">
              {isYear ? "Specific Year" : isMonth ? "Specific Month" : "Specific Date Range"}
            </Radio>

            {renderCustomDatePicker()}
          </Space>
        </div>
      </Radio.Group>
    </div>
  );
};

export default RadioButton;
