import { useState, useEffect } from "react";
import { DatePicker } from "@tremor/react";
import TimePicker from "./TimePicker";

export default function Modal({ onClose }) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(null);
  const [bpHigh, setBpHigh] = useState("");
  const [bpLow, setBpLow] = useState("");
  const [pulse, setPulse] = useState("");

  const handleSubmit = () => {
    // Handle form submission here
    onClose();
  };

  useEffect(() => {
    // Add the 'overflow-hidden' class when the modal opens
    document.body.classList.add("overflow-hidden");

    // Remove the 'overflow-hidden' class when the modal closes
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity backdrop-blur-sm"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-zinc-900 opacity-50 "></div>
        </div>

        <span className="hidden" aria-hidden="true">
          &#8203;
        </span>

        <div
          className=" bg-zinc-900 py-6 lg:py-4 rounded-lg text-left transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-zinc-900 px-4 sm:p-6 sm:pb-4 rounded-t-lg">
            <div className="sm:flex sm:items-start">
              <div className="text-center">
                <h1
                  className="text-xl leading-6 font-medium text-zinc-200"
                  id="modal-title"
                >
                  Add New Entry
                </h1>
                <div className="space-y-8 py-12">
                  <div className="flex gap-x-4 justify-between">
                    <DatePicker
                      value={date}
                      onValueChange={setDate}
                      className="rounded-lg ring-0 outline-none"
                    />
                    <TimePicker />
                  </div>
                  <div className="flex gap-x-4 h-[38px] justify-between">
                    <div className="flex rounded-lg bg-zinc-900 border border-zinc-800 items-center">
                      <input
                        type="number"
                        value={bpHigh}
                        onChange={(e) => setBpHigh(e.target.value)}
                        placeholder="Systolic"
                        className="pl-2 w-1/2 bg-inherit outline-none"
                      />
                      <div className="text-zinc-300">/</div>
                      <input
                        type="number"
                        value={bpLow}
                        onChange={(e) => setBpLow(e.target.value)}
                        placeholder="Diastolic"
                        className="pl-2 w-1/2 bg-inherit outline-none"
                      />
                    </div>
                    <input
                      type="number"
                      value={pulse}
                      onChange={(e) => setPulse(e.target.value)}
                      placeholder="Pulse"
                      className="rounded-lg bg-zinc-900 border border-zinc-800 pl-2 w-full outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 px-4 flex justify-center rounded-b-lg">
            <button
              type="button"
              onClick={handleSubmit}
              className=" bg-blue-600 rounded-full px-8 py-1 text-zinc-100"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
