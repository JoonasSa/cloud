import { useCloudSelectionContext } from "../contexts/CloudSelectionContext";
import { Cloud } from "../models/Cloud";

type CloudSelectorProps = { clouds: Cloud[] };

const CloudSelector = ({ clouds }: CloudSelectorProps) => {
  const {
    selectedProviderId,
    setSelectedProviderId,
    setSelectedRegion,
    setGeoLocationStatus,
  } = useCloudSelectionContext();

  const getUniqueProviderOptions = () => {
    const unique: { [val: string]: string } = {};
    for (const cloud of clouds) {
      unique[cloud.cloud_provider_name] = cloud.cloud_provider_id;
    }

    return Object.keys(unique).map((provider_name) => (
      <option key={unique[provider_name]} value={unique[provider_name]}>
        {provider_name}
      </option>
    ));
  };

  const getUniqueRegionOptions = () =>
    [
      ...new Set(
        clouds
          .filter((cloud) => cloud.cloud_provider_id === selectedProviderId)
          .map((cloud) => cloud.geo_region)
      ),
    ].map((geo_region) => (
      <option key={geo_region} value={geo_region}>
        {geo_region}
      </option>
    ));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginLeft: "1em",
        marginRight: "1em",
      }}
    >
      <div style={{ paddingRight: "1em" }}>
        Select cloud provider{" "}
        <select
          onChange={(e) => {
            setSelectedProviderId(e.target.value);
            setGeoLocationStatus(undefined);
          }}
        >
          <option key={"undefined"} value={undefined}>
            No provider selected
          </option>
          {getUniqueProviderOptions()}
        </select>
      </div>
      <div>
        Select region{" "}
        <select
          disabled={selectedProviderId === undefined}
          onChange={(e) => {
            setSelectedRegion(e.target.value);
            setGeoLocationStatus(undefined);
          }}
        >
          <option key={"undefined"} value={undefined}>
            No region selected
          </option>
          {selectedProviderId !== undefined && getUniqueRegionOptions()}
        </select>
      </div>
    </div>
  );
};

export default CloudSelector;
