"use client";

import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { INITIAL_SEAT_MAP, SEAT_PRICE } from "@/components/constants";
import { Header } from "@/components/Header";
import { Legend } from "@/components/Legend";
import { Theater } from "@/components/Theater";
import { Details } from "@/components/Details";
import { Checkout } from "@/components/Checkout";

/**
 * Page component to manage the state of the application and render the phone screen(s)
 * There are 3 state to a seat:
 * - reserved: reserved by other users and cannot be changed in this app
 * - available: available to be selected
 * - selected: selected by the current user
 *
 * Each seat has a price of 10, configured in the SEAT_PRICE constant
 */
const TicketingPage = () => {
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

  return (
    <div className="app w-full flex items-center justify-center">
      <Screen theme="dark">
        <Header handleMinus={handleMinus} handlePlus={handlePlus} />
        <Legend available={available.length} selected={selected.length} />
        <Theater seats={seats} onSeatClick={onSeatClick} />
        <Details
          selectedSeats={selected.map((seat) => ({
            seat,
            price: SEAT_PRICE,
          }))}
          onDetailClick={onDetailClick}
        />
        <Checkout />
      </Screen>
    </div>
  );
};

export default TicketingPage;

export type Theme = "light" | "dark";
// phone screen as a rounded box with a noticeable shadow
// update the custom properties according to the theme variable
const Screen = styled.div<{ theme: Theme }>`
  --color: ${({ theme }) => (theme === "light" ? "#2c2f62" : "#eee")};
  --background: ${({ theme }) => (theme === "light" ? "#fff" : "#2c2f62")};
  --accent: ${({ theme }) => (theme === "light" ? "#fd6d8e" : "#fcb43c")};
  border-radius: 30px;
  width: 300px;
  min-height: 500px;
  color: var(--color, #2c2f62);
  background: var(--background, #ffffff);
  padding: 2rem 2rem 1.25rem;
  box-shadow: 0 2px 10px -8px hsla(0, 0%, 0%, 0.4);
  margin: 1rem;
`;
