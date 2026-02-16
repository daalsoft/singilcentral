import { useEffect, useState } from "react";

interface Props {
  value: string; // YYYYMM
  onChange: (month: string) => void;
}

export default function MonthSelector({ value, onChange }: Props) {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (value && value.length === 6) {
      setInput(`${value.slice(0, 4)}-${value.slice(4, 6)}`); // YYYY-MM
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;        // YYYY-MM
    setInput(v);
    onChange(v.replace("-", ""));     // 부모로 YYYYMM 전달
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "10px 0" }}>
      <label style={{ fontWeight: "bold", fontSize: "16px" }}>거래월</label>
      <input
        type="month"
        value={input}
        onChange={handleChange}
        style={{
          height: "40px",
          padding: "0 10px",
          fontSize: "15px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}
