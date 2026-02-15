import { useEffect, useState } from "react";

interface Props {
  value: string;
  onChange: (month: string) => void;
}

export default function MonthSelector({ value, onChange }: Props) {
  const [input, setInput] = useState(value);

  useEffect(() => {
    setInput(value);
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value.replace(/\D/g, ""); // 숫자만
    if (v.length <= 6) {
      setInput(v);
      onChange(v);
    }
  }

  return (
    <div style={{ margin: "20px" }}>
      <label style={{ marginRight: "10px", fontWeight: "bold" }}>
        조회월 (YYYYMM)
      </label>
      <input
        value={input}
        onChange={handleChange}
        placeholder="예: 202601"
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
