import { useEffect, useState } from "react";

interface Props {
  value: string; // "202602"
  onChange: (month: string) => void;
}

export default function MonthSelector({ value, onChange }: Props) {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (value && value.length === 6) {
      // YYYYMM → YYYY-MM 로 변환
      setInput(`${value.slice(0, 4)}-${value.slice(4, 6)}`);
    }
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value; // YYYY-MM 형식
    setInput(v);

    // YYYY-MM → YYYYMM 변환
    const formatted = v.replace("-", "");
    onChange(formatted);
  }

  return (
    <div style={{ margin: "20px" }}>
      <label style={{ marginRight: "10px", fontWeight: "bold" }}>
        거래월
      </label>

      <input
        type="month"
        value={input}
        onChange={handleChange}
        style={{
          padding: "8px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}
