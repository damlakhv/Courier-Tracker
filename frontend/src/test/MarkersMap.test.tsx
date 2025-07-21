import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@react-google-maps/api", () => {
    return {
        GoogleMap: ({ children }: any) => (
            <div data-testid="google-map">{children}</div>
        ),
        Marker: ({ children, onClick }: any) => (
            <div data-testid="marker" onClick={onClick}>
                {children}
            </div>
        ),
        InfoWindow: ({ children }: any) => (
            <div data-testid="info-window">{children}</div>
        ),
        Polyline: () => <div data-testid="polyline" />,
    };
});

import MarkersMap from "../components/map/MarkersMap";
import { Store } from "../types/store";
import { CourierLastLocation } from "../types/courierLastLocation";
import { CourierLog } from "../types/courierLog";

describe("MarkersMap Component", () => {
    const stores: Store[] = [
        { id: 1, name: "Store A", lat: 41.0, lng: 29.0 },
        { id: 2, name: "Store B", lat: 41.1, lng: 29.1 },
    ];
    const couriers: CourierLastLocation[] = [
        { courierId: 10, lat: 41.2, lng: 29.2 },
        { courierId: 20, lat: 41.3, lng: 29.3 },
    ];
    const logs: CourierLog[] = [
        {
            lat: 41.2, lng: 29.2, timestamp: '2025-07-21T10:00:00Z',
            id: 1,
            courierId: 3
        },
        {
            lat: 41.25, lng: 29.25, timestamp: "2025-07-21T10:05:00Z",
            id: 2,
            courierId: 2
        },
    ];

    it("renders GoogleMap container", () => {
        render(
            <MarkersMap
                stores={[]}
                couriers={[]}
                logs={[]}
                onCourierClick={jest.fn()}
            />
        );
        expect(screen.getByTestId("google-map")).toBeInTheDocument();
    });

    it("renders one <Marker> per store and courier", () => {
        render(
            <MarkersMap
                stores={stores}
                couriers={couriers}
                logs={[]}
                onCourierClick={jest.fn()}
            />
        );
        expect(screen.getAllByTestId("marker")).toHaveLength(4);
    });

    it("renders <Polyline> when logs.length >= 2", () => {
        render(
            <MarkersMap
                stores={[]}
                couriers={[]}
                logs={logs}
                onCourierClick={jest.fn()}
            />
        );
        expect(screen.getByTestId("polyline")).toBeInTheDocument();
    });

    it("does NOT render <Polyline> when logs.length < 2", () => {
        render(
            <MarkersMap
                stores={[]}
                couriers={[]}
                logs={[logs[0]]}
                onCourierClick={jest.fn()}
            />
        );
        expect(screen.queryByTestId("polyline")).toBeNull();
    });

    it("calls onCourierClick with correct courierId when a courier marker is clicked", async () => {
        const onCourierClick = jest.fn();
        const user = userEvent.setup();
        render(
            <MarkersMap
                stores={[]}
                couriers={couriers}
                logs={[]}
                onCourierClick={onCourierClick}
            />
        );
        const markerEls = screen.getAllByTestId("marker");
        await user.click(markerEls[0]);
        expect(onCourierClick).toHaveBeenCalledWith(10);
    });
});
