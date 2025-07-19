import { GoArrowUpRight } from "react-icons/go";

const InputBox = ({ value, onChange, onSend, disabled }) => {
  return (
    <div className="w-full bg-white py-4 px-0 sm:px-4">
      <div className="relative w-full sm:max-w-[622px] sm:mx-auto px-4 sm:px-0">
        <input
          type="text"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-black shadow focus:outline-none focus:ring-2 focus:ring-gray-300"
          placeholder="Type a message..."
          value={value}
          onChange={onChange}
          disabled={disabled}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
        />
        <button
          onClick={onSend}
          disabled={disabled}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-md disabled:opacity-50"
        >
          <GoArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default InputBox;
