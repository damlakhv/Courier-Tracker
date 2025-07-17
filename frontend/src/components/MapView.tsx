
import React from 'react';
import {Row, Col, Card, Alert} from 'antd';
import './Page.css';
import useGoogleMapsLoader from "../useGoogleMapsLoader";
import CourierMap from "./CourierMap";

export default function MapView() {
    const apiKey= " ";
    const { isGoogleMapsLoaded, error } = useGoogleMapsLoader(apiKey);

    const getCourierMap = () => {
        if(!isGoogleMapsLoaded || error){
            return (<Alert type={"error"} message={"Map yüklenmedi. Error: " + error}/>)
        } else{
            return (<CourierMap/>)
        }
    }



    return (
        <Row gutter={[16, 16]} className="page-container">
            <Col xs={24}>
                <Card title="Global Map">
                    {getCourierMap()}
                </Card>
            </Col>
        </Row>
    );
}
