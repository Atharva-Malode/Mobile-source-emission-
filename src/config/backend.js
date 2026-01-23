const HOST = process.env.NEXT_PUBLIC_BACKEND_HOST;

export const WS_ENDPOINTS = {
  VEHICLE_COUNT: `ws://${HOST}/ws`,
};

export const REST_ENDPOINTS = {
  GET_CSV: `http://${HOST}/get_csv`,
};

export const JSON_ENDPOINTS = {
  GET_JSON: `http://${HOST}/get_json`
};

export const EMISSION_CALCULATION_ENDPOINT = {
  CALCULATE: `http://${HOST}/calculate-emissions`
};