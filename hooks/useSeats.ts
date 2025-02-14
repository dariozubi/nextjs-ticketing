import { INITIAL_SEAT_MAP } from "@/components/constants";
import { useCallback, useMemo, useState } from "react";

export function useSeats() {
  const [seats, setSeats] = useState(INITIAL_SEAT_MAP);
  const [manuallySelectedSeats, setManuallySelectedSeats] = useState<number[]>(
    []
  );

  const changeSeat = useCallback((index: number, value: string) => {
    setSeats((seats) => {
      const newSeats = [...seats];
      newSeats[index] = value;
      return newSeats;
    });
  }, []);

  const { available, selected } = useMemo(() => {
    const available: number[] = [];
    const selected: number[] = [];
    seats.forEach((s, i) => {
      if (s === "available") available.push(i);
      if (s === "selected") selected.push(i);
    });
    return { available, selected };
  }, [seats]);

  const handlePlus = () => {
    if (available.length > 0) {
      const randomSeat =
        available[Math.floor(Math.random() * available.length)];
      changeSeat(randomSeat, "selected");
    }
  };

  const handleMinus = () => {
    if (selected.length > 0) {
      const removableSeats = selected.filter(
        (s) => !manuallySelectedSeats.includes(s)
      );

      if (removableSeats.length > 0) {
        const randomSeat =
          removableSeats[Math.floor(Math.random() * removableSeats.length)];
        changeSeat(randomSeat, "available");
      }
    }
  };

  const onSeatClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const status = e.currentTarget.getAttribute("data-status");
    const index = Number(e.currentTarget.getAttribute("data-index"));

    if (status === "available") {
      changeSeat(index, "selected");
      setManuallySelectedSeats((seats) => [...seats, index]);
    }

    if (status === "selected") {
      changeSeat(index, "available");
      setManuallySelectedSeats((seats) => seats.filter((s) => s === index));
    }
  };

  const onDetailClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = Number(e.currentTarget.getAttribute("data-index"));
    changeSeat(index, "available");
    setManuallySelectedSeats((seats) => seats.filter((s) => s === index));
  };

  return {
    seats,
    available,
    selected,
    handleMinus,
    handlePlus,
    onSeatClick,
    onDetailClick,
  };
}
