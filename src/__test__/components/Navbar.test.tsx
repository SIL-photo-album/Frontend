import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import { render, screen } from "@testing-library/react";
import LoginButton from "@/components/button/LoginButton";

import Navbar from "@/components/navbar/Navbar";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("sample test", () => {
  it("example test", () => {
    render(<Navbar />);
    expect(screen.getByText("Ian Kamau")).toBeInTheDocument();
    expect(screen.getByText("Ian Kamau").getAttribute("href")).toBe("/");
  });
});
