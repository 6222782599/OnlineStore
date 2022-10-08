export type ResponseProp = {
    errorMessage: null;
    results: ResultsProp;
};

export type ResultsProp = {
    locationName: string;
    weather: {
        timeStamp: string;
        temperature: {
            temp: number;
            temp_min: number;
            temp_max: number;
        };
        pressure: number;
        seaLevel: number | null;
        description: string;
        humidity: number;
        icon: string;
        wind: {
            deg: number;
            speed: number;
        };
        rain: number | null;
    }[];
};

export type LocationProp = {
    lat: number;
    lon: number;
};
