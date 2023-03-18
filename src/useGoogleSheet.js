import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'AIzaSyA9R--OZMK8_T1uqzfyAXuDz0VFhcoZtmY';
const SHEET_ID = '1zlsHl_qoelvGvQR9XwDypNckIPhc_-KEW12q2BvYusQ';
const SHEET_NAME = 'Sheet1';

const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
const writeUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}:append?valueInputOption=RAW&key=${API_KEY}`;

export function useGoogleSheet() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(readUrl);
            setData(response.data.values);
        };

        fetchData();
    }, []);

    const updateData = async (points, activity) => {
        const newRow = [points, activity];
        await axios.post(writeUrl, { values: [newRow] });
        setData([...data, newRow]);
    };

    return [data, updateData];
}