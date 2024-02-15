import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Album from "@/components/album/album";
import Loading from "@/app/(dashboard)/album/loading";

describe("Album", () => {
  const albumData = { id: 3, title: "Test Albu," };

  it("Testing the album component", () => {
    render(<Album title={albumData.title} id={`/album/${albumData.id}`} />);

    expect(screen.getByText(albumData.title)).toBeInTheDocument();
  });

  it("Tests album Loading", () => {
    render(<Loading />);
    expect(screen.getByTestId("album-test")).toBeInTheDocument();
  });
});
