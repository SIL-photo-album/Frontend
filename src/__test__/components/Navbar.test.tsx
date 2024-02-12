import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/navbar/Navbar";

// jest.mock("next/router", () => ({
//   useRouter: jest.fn(),
// }));

// describe("Page", () => {
//   it("renders a heading", () => {
//     render(<Navbar />);

//     const heading = screen.getByRole("link");
//     expect(heading).toBeInTheDocument();
//   });
// });

describe("sample test", () => {
  it("example test", () => {
    expect(1 + 1).toBe(2);
  });
});
