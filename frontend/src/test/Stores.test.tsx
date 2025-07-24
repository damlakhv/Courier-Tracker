import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import Stores from '../components/store/Stores';

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Stores component", () => {
    beforeEach(() => {
        mockedAxios.get.mockResolvedValue({
            data: [
                { id: 1, name: "Central", latitude: 41.01, longitude: 28.97 },
            ],
        });
    });

    it("renders Add Store button", async () => {
        render(<Stores />);

        const addBtn = await screen.findByText(/add store/i);
        expect(addBtn).toBeInTheDocument();

        expect(mockedAxios.get).toHaveBeenCalledWith("/api/stores");
    });
});
