const HOST = process.env.NEXT_PUBLIC_BACKEND_HOST;

export const WS_ENDPOINTS = {
  VEHICLE_COUNT: `ws://${HOST}/ws`,
};

export const REST_ENDPOINTS = {
  GET_CSV: `http://${HOST}/get_csv`,
};