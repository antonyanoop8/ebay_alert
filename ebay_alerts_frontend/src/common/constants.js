//API Base URL
export const BaseUrl = 'http://localhost:8000/';

//API Endpoints
export const Endpoints = {
    Login: `api/token/`,
    Alerts: `alerts/`
};

export const LocalStorageKeys = {
    Tokens: '@EBAY_ALERT::TOKENS'
};

export const TimeIntervals = {
    two_mins: '2 Mins',
    ten_mins: '10 Mins',
    thirty_mins: '30 Mins'
};

export const Statuses = {
    active: 'Active',
    disabled: 'Disabled'
};
