/** @format */

// /** @format */

// import React from "react";

// export default function Letter({ letter, text, border }) {
//   return (
//     <div className="bg-white w-[180px] h-[180px] rounded-[40px] flex items-center justify-center p-2">
//       <div
//         className={`flex items-center justify-center text-center text-6xl font-bold font ${text} border-4 ${border} w-full h-full rounded-[38px]`}>
//         {letter}
//       </div>
//     </div>
//   );
// }

/** @format */

import React from "react";

export default function Letter({ letter, index }) {
  return (
    <div
      className={`bg-white w-[180px] h-[180px] rounded-tr-[40px] rounded-bl-[40px] flex items-center justify-center p-2 scaleDownAnimation opacity-0`}
      style={{
        animationDelay: `${index * 0.2}s`, // Stagger each letter's animation
      }}>
      <div
        className={`flex items-center justify-center text-center text-6xl font-bold text-green-600  border-4 border-green-500  w-full h-full rounded-tr-[38px] rounded-bl-[38px]`}>
        {letter}
      </div>
    </div>
  );
}
