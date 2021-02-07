// TODO: better typing...

export type GeoLocationStatus =
  | { coord: GeoLocation; error: undefined }
  | { error: GeoLocationError };

type GeoLocation = { latitude: number; longitude: number };

type GeoLocationError = { message: string };
