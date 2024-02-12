import { render, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import AlbumPage from "@/app/(dashboard)/album/[id]/page";

// Mock useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Page component", () => {
  it("should go back when button is clicked", () => {
    // Mock useRouter implementation
    const mockRouter = {
      back: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    // Render the component
    const { getByText } = render(<AlbumPage params={{ id: "1" }} />);

    // Simulate click on the button
    fireEvent.click(getByText("Go back"));

    // Expect the back function to be called
    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });
});
