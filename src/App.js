import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

export default function BirthdayCountdown() {
  const [birthday, setBirthday] = useState('2025-05-23');
  const [today, setToday] = useState(dayjs());
  const [daysLeft, setDaysLeft] = useState(0);
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    title: '',
    description: '',
    photo: null,
    video: null
  });

  useEffect(() => {
    const diff = dayjs(birthday).startOf('day').diff(today.startOf('day'), 'day');
    setDaysLeft(diff);
  }, [birthday, today]);

  const handleEntryAdd = () => {
    setEntries([...entries, { ...newEntry, date: today.format('YYYY-MM-DD') }]);
    setNewEntry({ title: '', description: '', photo: null, video: null });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.h1
        className="text-4xl font-bold text-center mb-6 text-pink-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Countdown to Kiznaiver's Birthday 💖
      </motion.h1>

      <Card className="mb-6 bg-white/70 backdrop-blur-md shadow-xl">
        <CardContent className="p-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="text-pink-600" />
            <span className="text-lg">{daysLeft} days left until {dayjs(birthday).format('MMMM D, YYYY')}</span>
          </div>

          <Input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
        </CardContent>
      </Card>

      <Card className="mb-6 bg-pink-50 p-4 shadow-md rounded-2xl">
        <h2 className="text-xl font-semibold text-pink-700 mb-4">Add a Daily Entry</h2>
        <Input
          placeholder="Title"
          value={newEntry.title}
          onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
        />
        <Textarea
          placeholder="Write a sweet message or memory..."
          value={newEntry.description}
          onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
        />
        <Input type="file" accept="image/*" onChange={(e) => setNewEntry({ ...newEntry, photo: URL.createObjectURL(e.target.files[0]) })} />
        <Input type="file" accept="video/*" onChange={(e) => setNewEntry({ ...newEntry, video: URL.createObjectURL(e.target.files[0]) })} />
        <Button className="mt-2 bg-pink-600 text-white" onClick={handleEntryAdd}>Add Entry</Button>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {entries.map((entry, index) => (
          <Card key={index} className="bg-white/80 shadow-lg">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-pink-800">{entry.title}</h3>
              <p className="mb-2 text-gray-700">{entry.description}</p>
              {entry.photo && <img src={entry.photo} alt="Photo" className="rounded-lg mb-2 max-h-60 object-cover" />}
              {entry.video && <video controls src={entry.video} className="rounded-lg w-full" />}
              <p className="text-sm text-gray-500 mt-2">Date: {entry.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}