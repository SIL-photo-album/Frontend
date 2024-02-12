import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import User from "@/components/user/user";

describe("User Component", () => {
  const usersResponse = { id: 1, name: "John Doe" };
  const albumsResponse = [
    { id: 1, title: "Album 1", userId: 1 },
    { id: 2, title: "Album 2", userId: 1 },
  ];

  it("Testing user component to see if props get passed correctly", async () => {
    // Mock axios responses for users and albums

    render(<User user={usersResponse} numberOfAlbums={albumsResponse} />);

    // Wait for data to be fetched and displayed
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    expect(screen.getByText("Albums: 2")).toBeInTheDocument();
  });
});
