import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@tremor/react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

// use env variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home({ vitals }) {
  console.log(vitals);
  const [tableData, setTableData] = useState(vitals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: "",
    time: "",
    bp: "",
    pulse: "",
  });

  const addEntry = () => {
    setTableData([...tableData, newEntry]);
    setNewEntry({ date: "", time: "", bp: "", pulse: "" });
    setShowModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
      <h1 className="text-2xl font-mono text-green-200 text-center py-8">
        Vitals
      </h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell className="text-center dark:text-blue-300">
              Date
            </TableHeaderCell>
            <TableHeaderCell className="text-center dark:text-blue-300">
              Time
            </TableHeaderCell>
            <TableHeaderCell className="text-center dark:text-blue-300">
              <span className="hidden lg:block">Blood Pressure</span>
              <span className="lg:hidden block">BP</span>
            </TableHeaderCell>
            <TableHeaderCell className="text-center dark:text-blue-300">
              Pulse
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((entry, index) => (
            <TableRow key={index}>
              <TableCell
                className="text-center dark:text-zinc-400/80"
                // onClick={() => console.log(entry.date)}
              >
                {entry.date}
              </TableCell>
              <TableCell className="text-center dark:text-zinc-400/80">
                {entry.time}
              </TableCell>
              <TableCell className="text-center dark:text-zinc-400/80">
                {entry.bp}
              </TableCell>
              <TableCell className="text-center dark:text-zinc-400/80">
                {entry.pulse}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center items-center">
        <Button onClick={() => setIsModalOpen(true)}>Add</Button>
      </div>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export async function getStaticProps() {
  let { data, error } = await supabase.from("vitals").select("*");

  if (error) {
    console.error("Error fetching data: ", error);
  }

  const vitals = data
    .map(({ systolic, diastolic, id, date, time, pulse, ...rest }) => {
      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "2-digit",
      });

      const formattedTime = new Date(`1970-01-01T${time}`).toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }
      );

      return {
        ...rest,
        date: formattedDate,
        time: formattedTime,
        bp: `${systolic}/${diastolic}`,
        pulse: pulse || "-",
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    props: {
      vitals: vitals,
    },
  };
}
