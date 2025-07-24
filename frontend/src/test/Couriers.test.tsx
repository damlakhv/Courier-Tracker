import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Couriers from "../components/courier/Couriers";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Couriers Component", () => {
    beforeEach(() => {
        mockedAxios.get.mockResolvedValue({ data: [{ id: 1, name: "Dora" }] });
        mockedAxios.post.mockResolvedValue({});
        mockedAxios.put.mockResolvedValue({});
        mockedAxios.delete.mockResolvedValue({});
    });

    it("renders Add Courier button", async () => {
        render(<Couriers />);

        const btn = await screen.findByTestId("add-courier-btn");
        expect(btn).toBeInTheDocument();
        expect(btn).toHaveTextContent(/add courier/i);
        expect(mockedAxios.get).toHaveBeenCalledWith("/api/couriers");
    });

    it("opens edit modal when clicking edit button", async () => {
        const user = userEvent.setup();
        render(<Couriers />);

        mockedAxios.get.mockClear();

        const editIcon = await screen.findByLabelText("edit");
        await user.click(editIcon);

        const submitBtn = await screen.findByTestId("courier-upsert-submit");
        expect(submitBtn).toBeInTheDocument();

        const nameInput = screen.getByRole("textbox");
        await user.clear(nameInput);
        await user.type(nameInput, "Damla");
        await user.click(submitBtn);

        expect(mockedAxios.put).toHaveBeenCalledWith("/api/couriers/1", { name: "Damla" });
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    it("deletes courier and its related logs when confirming delete", async () => {
        const user = userEvent.setup();
        render(<Couriers />);

        mockedAxios.get.mockClear();
        mockedAxios.delete.mockClear();

        const deleteIcon = await screen.findByLabelText("delete");
        await user.click(deleteIcon);

        const yesBtn = await screen.findByRole("button", { name: /yes/i });
        await user.click(yesBtn);

        expect(mockedAxios.delete).toHaveBeenNthCalledWith(1, "/api/couriers/1");
        expect(mockedAxios.delete).toHaveBeenCalledTimes(1);

        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });
});
