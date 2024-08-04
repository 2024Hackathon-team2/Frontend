import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "moment/locale/ko"; // 한국어 로케일 추가
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../HomeCalendar/HomeCalendar.css";

const BASE_URL = "https://drinkit.pythonanywhere.com/";

const HomeCalendar = () => {
  const today = new Date();
  const [date, setDate] = useState(null); // 초기값을 null로 설정
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [totalRecord, setTotalRecord] = useState(null);
  const [attendDay, setAttendDay] = useState([]); // 출석한 날짜 배열

  const navigate = useNavigate();

  const handleDateChange = (newDate) => {
    if (date && moment(date).isSame(newDate, "day")) {
      setDate(null);
      setTotalRecord(null);
    } else {
      setDate(newDate);
      fetchRecord(newDate); // Fetch the record for the new date
    }
  };

  const fetchRecord = async (selectedDate) => {
    const token = localStorage.getItem("accessToken");

    const year = moment(selectedDate).year();
    const month = moment(selectedDate).month() + 1;
    const day = moment(selectedDate).date();

    try {
      const response = await axios.get(`${BASE_URL}records`, {
        params: {
          year: year,
          month: month,
          day: day,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const record = response.data;
      setTotalRecord(record.total_record !== "0.0" ? record : null);
    } catch (error) {
      console.error("Error fetching record:", error);
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access - check your access token");
      }
      setTotalRecord(null);
    }
  };

  const deleteRecord = async () => {
    const token = localStorage.getItem("accessToken");

    const year = moment(date).year();
    const month = moment(date).month() + 1;
    const day = moment(date).date();

    try {
      await axios.delete(`${BASE_URL}records`, {
        params: {
          year: year,
          month: month,
          day: day,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTotalRecord(null); // Clear the record after deletion

      // Fetch attend days again to refresh the calendar dots
      fetchAttendDays(year, month);
    } catch (error) {
      console.error("Error deleting record:", error);
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access - check your access token");
      }
    }
  };

  const fetchAttendDays = async (year, month) => {
    const token = localStorage.getItem("accessToken");

    const daysInMonth = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
    const promises = [];

    for (let day = 1; day <= daysInMonth; day++) {
      promises.push(
        axios
          .get(`${BASE_URL}records`, {
            params: {
              year: year,
              month: month,
              day: day,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              // 404 오류는 무시하고 빈 값 반환
              return null;
            }
            throw error;
          })
      );
    }

    try {
      const responses = await Promise.all(promises);
      const attendDays = responses
        .filter((response) => response && response.data.total_record !== "0.0")
        .map((response) => {
          const { year, month, day } = response.config.params;
          const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
            day
          ).padStart(2, "0")}`;
          console.log("Recorded day:", dateStr); // 기록 있는 날 로그 추가
          return dateStr;
        });

      setAttendDay(attendDays);
    } catch (error) {
      console.error("Error fetching attend days:", error);
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access - check your access token");
      }
    }
  };

  const goToRecordPage = () => {
    if (date) {
      navigate("/record", { state: { selectedDate: date } });
    } else {
      alert("날짜를 선택해주세요.");
    }
  };

  useEffect(() => {
    moment.locale("ko"); // 한국어 로케일 설정
    const year = moment(activeStartDate).year();
    const month = moment(activeStartDate).month() + 1;
    fetchAttendDays(year, month); // 컴포넌트가 마운트 될 때 초기 데이터 가져오기
  }, [activeStartDate]);

  return (
    <div className="CalendarContainer">
      <div className="CalendarWrapper">
        <Calendar
          value={date}
          onChange={handleDateChange}
          formatDay={(locale, date) => moment(date).format("D")}
          formatYear={(locale, date) => moment(date).format("YYYY")}
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
          calendarType="gregory"
          next2Label={null}
          prev2Label={null}
          minDetail="year"
          activeStartDate={
            activeStartDate === null ? undefined : activeStartDate
          }
          onActiveStartDateChange={({ activeStartDate }) => {
            setActiveStartDate(activeStartDate);
            const year = moment(activeStartDate).year();
            const month = moment(activeStartDate).month() + 1;
            fetchAttendDays(year, month); // 새로 보이는 달에 대해 출석 날짜 가져오기
          }}
          tileContent={({ date, view }) => {
            let html = [];
            if (
              view === "month" &&
              date.getMonth() === today.getMonth() &&
              date.getDate() === today.getDate()
            ) {
              html.push(
                <div className="today" key={"today"}>
                  오늘
                </div>
              );
            }
            if (attendDay.includes(moment(date).format("YYYY-MM-DD"))) {
              html.push(
                <div className="dot" key={moment(date).format("YYYY-MM-DD")} />
              );
            }
            return <div className="tile">{html}</div>;
          }}
        />
        <div className="GotoDrinkingRecord" onClick={goToRecordPage}>
          음주기록 +
        </div>
      </div>
      {date && (
        <div className="SelectedDateWrapper visible">
          <div className="SelectedDate">
            {moment(date).format("YYYY년 MM월 DD일 dddd")}
          </div>
          <div className="DrinkAmount">
            {totalRecord !== null
              ? `${totalRecord.total_record}잔`
              : "기록 없음"}
            {totalRecord !== null && (
              <button onClick={deleteRecord} className="DeleteRecordButton">
                삭제
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeCalendar;
