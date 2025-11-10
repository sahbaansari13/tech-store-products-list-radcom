"use client";

import { useState } from "react";
import { countFridaysUntilEndOfJalaaliYear } from "@/lib/countFridays";
import { getWeekdayOfNthJalaaliDay } from "@/lib/weekdayOfNthDay";

export default function Page() {
  const [jy, setJy] = useState(1404);
  const [jm, setJm] = useState(8);
  const [jd, setJd] = useState(15);
  const [fridays, setFridays] = useState<number | null>(null);

  const [nYear, setNYear] = useState(1404);
  const [n, setN] = useState(1);
  const [weekday, setWeekday] = useState<any | null>(null);

  const handleCountFridays = () => {
    try {
      const result = countFridaysUntilEndOfJalaaliYear(jy, jm, jd);
      setFridays(result);
    } catch {
      setFridays(null);
    }
  };

  const handleCheckWeekday = () => {
    try {
      const res = getWeekdayOfNthJalaaliDay(nYear, n);
      setWeekday(res);
    } catch {
      setWeekday(null);
    }
  };

  return (
    <main
      style={{
        direction: "rtl",
        fontFamily: "Vazirmatn, sans-serif",
        padding: 20,
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      <section
        style={{
          border: "1px solid #ccc",
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
        }}
      >
        <h2>تا آخر سال چند تا جمعه داریم؟</h2>
        <div>
          <label>
            سال:
            <input
              type="number"
              value={jy}
              onChange={(e) => setJy(Number(e.target.value))}
              style={{ margin: "0 8px" }}
            />
          </label>
          <label>
            ماه:
            <input
              type="number"
              value={jm}
              onChange={(e) => setJm(Number(e.target.value))}
              style={{ margin: "0 8px" }}
            />
          </label>
          <label>
            روز:
            <input
              type="number"
              value={jd}
              onChange={(e) => setJd(Number(e.target.value))}
              style={{ margin: "0 8px" }}
            />
          </label>
        </div>
        <button onClick={handleCountFridays} style={{ marginTop: 12 }}>
          محاسبه کن
        </button>
        {fridays !== null && (
          <p style={{ marginTop: 10 }}>
            از {jd}/{jm}/{jy} تا پایان سال {jy} تعداد <strong>{fridays}</strong>{" "}
            جمعه داریم.
          </p>
        )}
      </section>

      <section
        style={{
          border: "1px solid #ccc",
          borderRadius: 12,
          padding: 16,
        }}
      >
        <h2>روز nام سال چند شنبه اس؟</h2>
        <div>
          <label>
            سال:
            <input
              type="number"
              value={nYear}
              onChange={(e) => setNYear(Number(e.target.value))}
              style={{ margin: "0 8px" }}
            />
          </label>
          <label>
            شماره روز:
            <input
              type="number"
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              style={{ margin: "0 8px" }}
            />
          </label>
        </div>
        <button onClick={handleCheckWeekday} style={{ marginTop: 12 }}>
          بررسی کن
        </button>
        {weekday && (
          <p style={{ marginTop: 10 }}>
            روز {n}ام سال {nYear} برابر است با{" "}
            <strong>
              {weekday.jalaliDay}/{weekday.jalaliMonth}/{nYear}
            </strong>{" "}
            و روز هفته: <strong>{weekday.weekdayName}</strong>
          </p>
        )}
      </section>
    </main>
  );
}
