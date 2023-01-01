import styles from "./Statistical.module.scss";
import classNames from "classnames/bind";
import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import axios from "axios";

registerLocale("vi", vi);
const cx = classNames.bind(styles);
const url = "https://be-paint-management1.onrender.com/products/statistical-income";

function Statistical() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const data = {
    from_date: new Date(startDate).getTime(),
    to_date: new Date(endDate).getTime(),
  };

  console.log(data)
  useEffect(() => {
    onSubmit();
  }, [data]);

  const onSubmit = async (e) => {
    await axios.get(url).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("day-select")}>
        <div className={cx("start-day")}>
          <h3>Từ ngày: </h3>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            locale="vi"
          />
        </div>

        <div className={cx("end-day")}>
          <h3>Đến ngày: </h3>

          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            locale="vi"
          />
        </div>
      </div>
    </div>
  );
}

export default Statistical;
