import React, { useState } from "react";

const GoalPage = () => {
  const [selections, setSelections] = useState([{ drink: "", amount: "" }]);
  const [message, setMessage] = useState("");

  const drinksOptions = {
    "": [],
    소주: ["1잔 (50ml)", "2잔", "3잔", "4잔", "5잔", "6잔"],
    맥주: ["1잔 (200ml)", "2잔", "1병", "1병 반"],
    막걸리: ["1사발 (250ml)", "2사발", "1병", "1병 반"],
    와인: ["1잔 (150ml)", "2잔", "3잔", "4잔"],
  };

  const handleAddClick = () => {
    if (selections.length < 3) {
      setSelections([...selections, { drink: "", amount: "" }]);
    } else {
      setMessage("최대 생성 개수를 초과하였습니다");
    }
  };

  const handleSelectionChange = (index, type, value) => {
    const newSelections = [...selections];
    newSelections[index][type] = value;
    setSelections(newSelections);
  };

  const handleSubmit = () => {
    console.log("Selections:", selections);
  };

  return (
    <div style={{ width: "390px", height: "844px" }}>
      <header style={headerStyle}>음주 목표 설정</header>
      <div style={{ padding: "20px" }}>
        <div style={questionStyle}>한 달에 얼마를 목표로 하시나요?</div>
        {selections.map((selection, index) => (
          <div key={index} style={{ display: "flex", marginBottom: "10px" }}>
            <select
              value={selection.drink}
              onChange={(e) =>
                handleSelectionChange(index, "drink", e.target.value)
              }
              style={{ marginRight: "10px", width: "45%" }}
            >
              <option value="">주종</option>
              <option value="소주">소주</option>
              <option value="맥주">맥주</option>
              <option value="막걸리">막걸리</option>
              <option value="와인">와인</option>
            </select>
            <select
              value={selection.amount}
              onChange={(e) =>
                handleSelectionChange(index, "amount", e.target.value)
              }
              style={{ marginRight: "10px", width: "45%" }}
            >
              <option value="">N잔</option>
              {drinksOptions[selection.drink].map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
        {message && (
          <div style={{ color: "red", marginBottom: "10px" }}>{message}</div>
        )}
        <button onClick={handleAddClick} style={buttonStyle}>
          추가
        </button>
      </div>
      <footer style={footerStyle}>
        <button onClick={handleSubmit} style={submitButtonStyle}>
          목표 설정 완료
        </button>
      </footer>
    </div>
  );
};

const headerStyle = {
  width: "390px",
  height: "54px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Pretendard",
  fontSize: "18px",
  fontWeight: 600,
  lineHeight: "22px",
  letterSpacing: "-0.408px",
  textAlign: "center",
  color: "#000",
};

const questionStyle = {
  fontFamily: "Pretendard",
  fontSize: "15.246px",
  fontWeight: 600,
  color: "#000",
  marginBottom: "10px",
};

const buttonStyle = {
  backgroundColor: "#000",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
};

const footerStyle = {
  width: "100%",
  height: "54px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#e0e0e0",
};

const submitButtonStyle = {
  backgroundColor: "#555",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
};

export default GoalPage;
