import React from "react";
import { render, screen } from "@testing-library/react";
import Couriers from "../components/courier/Couriers";
import axios from "axios";
import {userEvent} from "@testing-library/user-event";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Couriers Component", () => {
    beforeEach(() => {
        mockedAxios.get.mockResolvedValue({ data: [{ id: 1, name: "Dora"}] });
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

    it('opens edit modal when clicking edit button', async () => {
        const user = userEvent.setup();
        render(<Couriers/>);

        const editIcon = await screen.findByLabelText("edit");
        await user.click(editIcon);

        const submitBtn = await screen.findByTestId("courier-upsert-submit");
        expect(submitBtn).toBeInTheDocument();

        const nameInput = screen.getByRole("textbox");
        await user.clear(nameInput);
        await user.type(nameInput, "Damla");
        await user.click(submitBtn);
        expect(mockedAxios.put).toHaveBeenCalledWith("/api/couriers/1", { name: "Damla" });
        expect(mockedAxios.get).toHaveBeenCalledTimes(2);

    });

    it('deletes courier when conforming delete', async() => {
        const user = userEvent.setup();
        render (<Couriers/>);

        const deleteTrigger = await screen.findByLabelText("delete")
        await user.click(deleteTrigger);

        const yesBtn= await screen.findByRole("button", { name: /yes/i });
        await user.click(yesBtn);
        expect(mockedAxios.delete).toHaveBeenCalledWith("/api/couriers/1");
        expect(mockedAxios.get).toHaveBeenCalledTimes(2);

    });


});
