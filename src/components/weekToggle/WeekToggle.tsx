import { useState } from "react";

const daysOfWeek = ["SU", "M", "T", "W", "TH", "F", "S"];

const WeekToggle = () => {
const [activeDays, setActiveDays] = useState<boolean[]>(new Array(7).fill(false));

const toggleDay = (index: number) => {
    setActiveDays((prev) =>
    prev.map((day, i) => (i === index ? !day : day))
    );
};

return (
    <div className="flex justify-center gap-2 mb-5">
        {daysOfWeek.map((day, index) => (
        <button
            key={day}
            onClick={() => toggleDay(index)}
            className={`w-10 h-10 flex items-center justify-center rounded-full border sans-pro-600 f-s-16 ${
            activeDays[index] ? "bg-[#8E9775] text-[#FAF2DA] border-[#8E9775]"  : "bg-white text-[#4A503D] border-[#4A503D]"
        }`}
        >
            {day}
        </button>
    ))}
    </div>
    );
};

export default WeekToggle;
