import { NavBar, DatePicker } from "antd-mobile";
import { useState, useMemo, useEffect } from "react";
import "./index.scss";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import DayBill from "./components/DayBill";

const Month = () => {
  // 按月做数据的分组
  const billList = useSelector(state => state.bill.billList)
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
  }, [billList])
  console.log("--------monthGroup-----", monthGroup);

  // 控制日期组件显示
  const [dateVisible, setDateVisible] = useState(false)

  // 控制显示时间
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format('YYYY-MM')
  })
  const [currentMonthList, setMonthList] = useState([])
  const monthResult = useMemo(() => {
    // 支出，收入，结余
    const pay = currentMonthList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
    const income = currentMonthList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);
      // console.log(pay, income, pay + income);
    return {
      pay,
      income,
      total: pay + income
    }
  }, [currentMonthList]);

  // 初始化当前月份数据。
  useEffect(() => {
    const nowDate = dayjs().format('YYYY-MM')
    if (monthGroup[nowDate]) {
      setMonthList(monthGroup[nowDate]);
    }
  }, [monthGroup])

  // 确认选择要查询的月份。
  const onConfirm = (date) => {
    setDateVisible(false);
    const formatDate = dayjs(date).format('YYYY-MM')
    setMonthList(monthGroup[formatDate] || []);
    setCurrentDate(formatDate)
  };

  // 当前月按日进行分组。
  const dayGroup = useMemo(() => {
    const groupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format("YYYY-MM-DD"));
    const keys = Object.keys(groupData)
    return {
      groupData,
      keys
    };
  })

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">{currentDate}月账单</span>
            <span
              className={classNames("arrow", dateVisible && "expand")}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onCancel={() => {
              setDateVisible(false);
            }}
            onConfirm={onConfirm}
            onClose={() => {
              setDateVisible(false);
            }}
            max={new Date()}
          />
        </div>
        {
          dayGroup.keys.map(key => {
            return <DayBill key={key} data={key} billList={dayGroup.groupData[key]}></DayBill>
          })
        }
      </div>
    </div>
  );
};

export default Month;
