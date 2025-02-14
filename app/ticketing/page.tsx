"use client";

import { SEAT_PRICE } from "@/components/constants";
import { Header } from "@/components/Header";
import { Legend } from "@/components/Legend";
import { Theater } from "@/components/Theater";
import { Details } from "@/components/Details";
import { Checkout } from "@/components/Checkout";
import { Screen } from "@/components/Screen";
import { useSeats } from "@/hooks/useSeats";

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
  const {
    seats,
    available,
    selected,
    handleMinus,
    handlePlus,
    onSeatClick,
    onDetailClick,
  } = useSeats();

  return (
    <div className="app w-full flex items-center justify-center">
      <Screen>
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
        <Checkout total={selected.length * SEAT_PRICE} />
      </Screen>
    </div>
  );
};

export default TicketingPage;
