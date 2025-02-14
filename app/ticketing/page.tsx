"use client";

import { useState } from "react";
import styled from "styled-components";
import { INITIAL_SEAT_MAP } from "@/components/constants";
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

  const handlePlus = () => {
    const availableSeats: number[] = [];
    seats.forEach((s, i) => {
      if (s === "available") availableSeats.push(i);
    });

    if (availableSeats.length > 0) {
      const randomSeat =
        availableSeats[Math.floor(Math.random() * availableSeats.length)];
      setSeats((seats) => {
        const newSeats = [...seats];
        newSeats[randomSeat] = "selected";
        return newSeats;
      });
    }
  };

  const handleMinus = () => {
    const selectedSeats: number[] = [];
    seats.forEach((s, i) => {
      if (s === "selected") selectedSeats.push(i);
    });

    if (selectedSeats.length > 0) {
      const randomSeat =
        selectedSeats[Math.floor(Math.random() * selectedSeats.length)];
      setSeats((seats) => {
        const newSeats = [...seats];
        newSeats[randomSeat] = "available";
        return newSeats;
      });
    }
  };

  return (
    <div className="app w-full flex items-center justify-center">
      <Screen theme="dark">
        <Header handleMinus={handleMinus} handlePlus={handlePlus} />
        <Legend />
        <Theater seats={seats} />
        <Details />
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
