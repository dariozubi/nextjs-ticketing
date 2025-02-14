import { PropsWithChildren, useState } from "react";
import styled from "styled-components";

export const Screen = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const current = localStorage.getItem("theme") as Theme;
    return current || "dark";
  });
  const isLight = theme === "light";
  return (
    <PhoneScreen theme={theme}>
      {children}
      <div className="flex justify-center">
        <button
          className={` text-sm text-center p-2 rounded mt-4 ${
            isLight ? "bg-slate-600 text-white" : "bg-white text-black"
          }`}
          onClick={() =>
            setTheme((theme) => {
              const newTheme = theme === "light" ? "dark" : "light";
              localStorage.setItem("theme", newTheme);
              return newTheme;
            })
          }
        >
          {`${isLight ? "Dark" : "Light"} theme`}
        </button>
      </div>
    </PhoneScreen>
  );
};

type Theme = "light" | "dark";

const PhoneScreen = styled.div<{ theme: Theme }>`
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
