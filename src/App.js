import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { motion } from "framer-motion";
import { format } from "date-fns";

const startDate = new Date("2025-04-20"); // Start of 28-day journey
const endDate = new Date("2025-05-20T00:00:00"); // End date at 12:00 AM on May 20th

const days = Array.from({ length: 28 }, (_, i) => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + i);
  return date;
});

const surpriseMessage = "🎉 Happy Birthday, Kiznaiver! 🎉\nThis journey was for you, from the first day to today. Here's to all our memories and all the ones yet to come. I love you ❤️";

export default function BirthdayCountdown() {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(
    days.find((day) => format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")) || days[0]
  );
  const [entries, setEntries] = useState(
    days.map((day) => ({ date: day, image: null, video: null, audio: null, message: "" }))
  );

  const handleFileChange = (index, type, file) => {
    const updatedEntries = [...entries];
    updatedEntries[index][type] = URL.createObjectURL(file);
    setEntries(updatedEntries);
  };

  const handleTextChange = (index, text) => {
    const updatedEntries = [...entries];
    updatedEntries[index].message = text;
    setEntries(updatedEntries);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="p-4 max-w-4xl mx-auto"
    >
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        28 Days of Love for Kiznaiver
      </motion.h1>

      <div className="grid grid-cols-6 gap-2 mb-6">
        {days.map((day, index) => (
          <Button
            key={index}
            onClick={() => setSelectedDay(day)}
            variant={format(day, "yyyy-MM-dd") === format(selectedDay, "yyyy-MM-dd") ? "default" : "outline"}
          >
            {format(day, "MMM d")}
          </Button>
        ))}
      </div>

      <motion.div layout className="transition-all">
        {entries.map((entry, index) => {
          if (format(entry.date, "yyyy-MM-dd") !== format(selectedDay, "yyyy-MM-dd")) return null;

          const isFinalDay = format(entry.date, "yyyy-MM-dd") === format(endDate, "yyyy-MM-dd");

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-4">
                <CardContent className="space-y-4">
                  <h2 className="text-2xl font-semibold text-center">
                    {format(entry.date, "MMMM d, yyyy")}
                  </h2>

                  {isFinalDay ? (
                    <div className="text-center space-y-4">
                      <motion.h3
                        className="text-3xl font-bold text-pink-600"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                      >
                        {surpriseMessage}
                      </motion.h3>
                    </div>
                  ) : (
                    <>
                      <textarea
                        value={entry.message}
                        onChange={(e) => handleTextChange(index, e.target.value)}
                        placeholder="Write your message..."
                        className="w-full p-2 border rounded resize-none h-24"
                      />
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(index, "image", e.target.files[0])}
                        />
                        {entry.image && <img src={entry.image} alt="Uploaded" className="w-full rounded-lg" />}

                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleFileChange(index, "video", e.target.files[0])}
                        />
                        {entry.video && <video src={entry.video} controls className="w-full rounded-lg" />}

                        <input
                          type="file"
                          accept="audio/*"
                          onChange={(e) => handleFileChange(index, "audio", e.target.files[0])}
                        />
                        {entry.audio && <audio src={entry.audio} controls className="w-full" />}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
