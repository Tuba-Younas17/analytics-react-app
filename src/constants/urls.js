export const BASE_URL = import.meta.env.VITE_API_URL;

// Common URL Prefixes
export const API = `/api`;
export const V1 = `/v1`;
export const DATAPOINT = `/datapoint`;

export const API_V1_PREFIX = `${API}${V1}`;
export const API_URL = `${BASE_URL}${API_V1_PREFIX}`;
export const END_POINTS = {
	DATAPOINT: {
		ADD_DATA_POINT: `${API_URL}${DATAPOINT}/add`,
	},
};
