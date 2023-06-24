import { useState } from "react";

export const useQueue = (initialValues: any[] = []) => {
  const [queue, setQueue] = useState(initialValues);

  const enqueue = (item: any) => setQueue([...queue, item]);

  const dequeue = () => {
    if (queue.length === 0) {
      throw new Error("Queue is empty!");
    }

    const [first, ...rest] = queue;
    setQueue(rest);
    return first;
  };

  const clear = () => setQueue([]);

  const first = () => queue[0];

  const last = () => queue[queue.length - 1];

  const size = () => queue.length;

  const shuffle = () => setQueue(queue.sort(() => 0.5 - Math.random()));

  return { enqueue, dequeue, clear, first, last, size, shuffle, queue };
};
