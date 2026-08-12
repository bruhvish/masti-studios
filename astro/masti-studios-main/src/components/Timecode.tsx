import { useEffect, useRef, useState } from 'react';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function Timecode() {
  const [display, setDisplay] = useState('00:00:00:00');
  const startRef = useRef(Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const totalSeconds = Math.floor(elapsed / 1000);
      const hh = Math.floor(totalSeconds / 3600);
      const mm = Math.floor((totalSeconds % 3600) / 60);
      const ss = totalSeconds % 60;
      const ff = Math.floor((elapsed % 1000) / 40);
      setDisplay(`${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`);
    }, 40);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="timecode mono">
      {display} <span className="rec-dot" style={{ animationDuration: '2.4s' }}></span> REC
    </div>
  );
}
