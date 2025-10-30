jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid"),
}));

const { findAll } = require("../models/quoteModel");
const mysql = require("mysql2/promise");

jest.mock("mysql2/promise");

test("findAll returns data from the quotes table", async () => {
  const mockExecute = jest
    .fn()
    .mockResolvedValue([
      [{ character: "Mario", game: "Mario Bros", quote: "It's me!" }],
    ]);
  const mockEnd = jest.fn();

  mysql.createConnection.mockResolvedValue({
    execute: mockExecute,
    end: mockEnd,
  });

  const result = await findAll();

  expect(result).toEqual([
    { character: "Mario", game: "Mario Bros", quote: "It's me!" },
  ]);
  expect(mockExecute).toHaveBeenCalledWith("SELECT * FROM quotes");
  expect(mockEnd).toHaveBeenCalled();
});
