import { useCloudSelectionContext } from "../contexts/CloudSelectionContext";
import { Cloud } from "../models/Cloud";

type CloudListingProps = { clouds: Cloud[] };

const CloudListing = ({ clouds }: CloudListingProps) => {
  const {
    selectedProviderId,
    selectedRegion,
    geoLocationStatus,
  } = useCloudSelectionContext();

  const getCloudsMatchingSelection = (): Cloud[] => {
    console.log(
      "getCloudsMatchingSelection",
      selectedProviderId,
      selectedRegion
    );
    if (selectedProviderId === undefined) {
      return clouds;
    }
    const providerClouds = clouds.filter(
      ({ cloud_provider_id }) => cloud_provider_id === selectedProviderId
    );
    if (selectedRegion === undefined) {
      return providerClouds;
    }
    return providerClouds.filter(
      ({ geo_region }) => geo_region === selectedRegion
    );
  };

  const eucledianDist = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number => Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

  const getCloudsSortedByDistance = (selectedClouds: Cloud[]): Cloud[] => {
    console.log("getCloudsSortedByDistance", geoLocationStatus);
    if (
      geoLocationStatus === undefined ||
      geoLocationStatus.error !== undefined
    ) {
      return selectedClouds;
    }

    const { latitude: x1, longitude: y1 } = geoLocationStatus.coord;

    const a = selectedClouds.sort(
      (a, b) =>
        eucledianDist(x1, y1, a.geo_latitude, a.geo_longitude) -
        eucledianDist(x1, y1, b.geo_latitude, b.geo_longitude)
    );

    console.log(x1, y1);
    console.log(a);

    return a;
  };

  return (
    <>
      {geoLocationStatus?.error && (
        <div>Encoutered an error while trying to access user's location.</div>
      )}
      {geoLocationStatus && geoLocationStatus.error === undefined && (
        <div>Cloud locations list ordered by proximity to user's location.</div>
      )}
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          listStyleType: "none",
          paddingInlineStart: 0,
        }}
      >
        {getCloudsSortedByDistance(getCloudsMatchingSelection()).map(
          ({ cloud_name, cloud_description }) => (
            <li>
              {`${cloud_description} - `}
              <b>{cloud_name}</b>
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default CloudListing;
