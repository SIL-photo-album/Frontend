import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginButton from "@/components/button/LoginButton";

import Navbar from "@/components/navbar/Navbar";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock signInWithPopup and signOut functions
jest.mock("./../../config/firebase.ts", () => ({
  auth: {
    signInWithPopup: jest.fn(),
    signOut: jest.fn(),
  },
  googleProvider: {},
}));

describe("LoginButton component", () => {
  it("checks the Link in the navbar", () => {
    render(<Navbar />);
    expect(screen.getByText("Ian Kamau")).toBeInTheDocument();
    expect(screen.getByText("Ian Kamau").getAttribute("href")).toBe("/");
  });

  it("renders Sign in with Google button when user is not logged in", () => {
    const { getByTestId } = render(<LoginButton />);
    expect(getByTestId("signIn")).toBeInTheDocument();
  });

  it("renders Logout button when user is logged in", async () => {
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue("test@example.com"),
      clear: jest.fn(),
    };
    Object.defineProperty(window, "localStorage", { value: localStorageMock });

    const { getByTestId } = render(<LoginButton />);
    await waitFor(() => expect(getByTestId("Logout")).toBeInTheDocument());
  });
});
