import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { bpHigh, bpLow, date, time, pulse } = req.body;

    const formattedData = {
      systolic: Number(bpHigh),
      diastolic: Number(bpLow),
      date: date,
      time: time,
      pulse: Number(pulse),
    };

    const { data, error } = await supabase
      .from("vitals")
      .insert([formattedData]);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json({ message: "Successfully added data", data });
  } else {
    return res.status(400).json({ message: "Invalid request method" });
  }
};

export default handler;
