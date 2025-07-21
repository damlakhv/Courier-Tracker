import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Stores from "../components/store/Stores";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Stores Component", () => {
    beforeEach(() => {
        mockedAxios.get.mockResolvedValue({
            data: [
                { id: 1, name: "Central", lat: 41.01, lng: 28.97 },
            ],
        });
        mockedAxios.post.mockResolvedValue({});
        mockedAxios.put.mockResolvedValue({});
        mockedAxios.delete.mockResolvedValue({});
    });

    it("renders Add Store button", async () => {
        render(<Stores />);

        const addBtn = await screen.findByRole("button", { name: /add store/i });
        expect(addBtn).toBeInTheDocument();

        expect(mockedAxios.get).toHaveBeenCalledWith("/api/stores");
    });

    it("opens edit modal when clicking edit icon and submits", async () => {
        const user = userEvent.setup();
        render(<Stores />);

        const editIcon = await screen.findByLabelText("edit");
        await user.click(editIcon);

        const saveBtn = await screen.findByRole("button", { name: /save/i });
        expect(saveBtn).toBeInTheDocument();

        const nameInput = screen.getByLabelText("Store Name");
        await user.clear(nameInput);
        await user.type(nameInput, "Downtown");

        await user.click(saveBtn);

        expect(mockedAxios.put).toHaveBeenCalledWith(
            "/api/stores/1",
            expect.objectContaining({ name: "Downtown" })
        );
        expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    });

    it("confirms deletion via Popconfirm", async () => {
        const user = userEvent.setup();
        render(<Stores />);

        await screen.findByText("Central");
        const deleteIcon = await screen.findByLabelText("delete");
        await user.click(deleteIcon);

        const yesBtn = await screen.findByRole("button", { name: /yes/i });
        await user.click(yesBtn);

        expect(mockedAxios.delete).toHaveBeenCalledWith("/api/stores/1");
        expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    });
});
