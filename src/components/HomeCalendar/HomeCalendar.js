import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "moment/locale/ko"; // 한국어 로케일 추가
import { useNavigate } from "react-router-dom"; // Add this import
import axios from "axios"; // Import axios
import "../HomeCalendar/HomeCalendar.css";

const BASE_URL = "https://drinkit.pythonanywhere.com/";

const HomeCalendar = () => {
  const today = new Date();
  const [date, setDate] = useState(null); // 초기값을 null로 설정
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [totalRecord, setTotalRecord] = useState(null); // Add state for total_record
  const attendDay = ["2024-07-03", "2024-07-13"]; // 출석한 날짜 예시

  const navigate = useNavigate(); // Initialize the navigate function

  const handleDateChange = (newDate) => {
    setDate(newDate);
    fetchRecord(newDate); // Fetch the record for the new date
  };

  const fetchRecord = async (selectedDate) => {
    const token = localStorage.getItem("accessToken");

    const year = moment(selectedDate).year();
    const month = moment(selectedDate).month() + 1; // 월은 0부터 시작함
    const day = moment(selectedDate).date();

    console.log(`Fetching record for ${year}-${month}-${day}`); // 날짜 확인용 로그

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

      console.log("API response:", response.data); // API 응답 확인용 로그

      const record = response.data;
      setTotalRecord(
        record.total_record !== "0.0" ? record.total_record : null
      );
    } catch (error) {
      console.error("Error fetching record:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access - check your access token");
      }
      setTotalRecord(null);
    }
  };

  const goToRecordPage = () => {
    if (date) {
      navigate("/record", { state: { selectedDate: date } }); // Pass the selected date
    } else {
      alert("날짜를 선택해주세요.");
    }
  };

  useEffect(() => {
    moment.locale("ko"); // 한국어 로케일 설정
  }, []);

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
          onActiveStartDateChange={({ activeStartDate }) =>
            setActiveStartDate(activeStartDate)
          }
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
            if (
              attendDay.find((x) => x === moment(date).format("YYYY-MM-DD"))
            ) {
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
      {date && ( // 날짜가 선택된 경우에만 보이기
        <div className="SelectedDateWrapper visible">
          <div className="SelectedDate">
            {moment(date).format("YYYY년 MM월 DD일 dddd")}
          </div>
          <div className="DrinkAmount">
            {totalRecord !== null ? `${totalRecord}잔` : "기록 없음"}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeCalendar;
