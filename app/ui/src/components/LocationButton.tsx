import { useCloudSelectionContext } from "../contexts/CloudSelectionContext";

export const LocationButton = () => {
  const { setGeoLocationStatus } = useCloudSelectionContext();

  const geoLocationOnSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setGeoLocationStatus({ coord: { latitude, longitude }, error: undefined });
  };

  const geoLocationOnFailure = (error: GeolocationPositionError) => {
    setGeoLocationStatus({ error: { message: error.message } });
  };

  const getGeoLocation = () =>
    navigator.geolocation.getCurrentPosition(
      geoLocationOnSuccess,
      geoLocationOnFailure
    );

  return (
    <button
      style={{
        marginLeft: "1em",
        marginRight: "1em",
      }}
      onClick={getGeoLocation}
    >
      Find the closest cloud
    </button>
  );
};
