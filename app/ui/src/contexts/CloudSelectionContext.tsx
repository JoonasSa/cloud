import React, { createContext, useContext, useState } from "react";
import { GeoLocationStatus } from "../models/GeoLocation";

export type CloudSelectionStateModel = {
  selectedProviderId: string | undefined;
  setSelectedProviderId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  selectedRegion: string | undefined;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string | undefined>>;
  geoLocationStatus: GeoLocationStatus | undefined;
  setGeoLocationStatus: React.Dispatch<
    React.SetStateAction<GeoLocationStatus | undefined>
  >;
};

// TODO: add proper typing
const placeholder: any = {};
const CloudSelectionContext = createContext<CloudSelectionStateModel>(
  placeholder
);

type Props = { children: React.ReactNode };

export const CloudSelectionProvider = ({ children }: Props) => {
  const [selectedProviderId, setSelectedProviderId] = useState<
    string | undefined
  >(undefined);
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>(
    undefined
  );
  const [selectedGeoLocation, setSelectedGeoLocation] = useState<
    GeoLocationStatus | undefined
  >(undefined);

  return (
    <CloudSelectionContext.Provider
      value={{
        selectedProviderId,
        setSelectedProviderId,
        selectedRegion,
        setSelectedRegion,
        geoLocationStatus: selectedGeoLocation,
        setGeoLocationStatus: setSelectedGeoLocation,
      }}
    >
      {children}
    </CloudSelectionContext.Provider>
  );
};

export const useCloudSelectionContext = (): CloudSelectionStateModel => {
  const context = useContext(CloudSelectionContext);

  if (context === undefined) {
    throw new Error(
      "useCloudSelectionContext must be used within an CloudSelectionProvider"
    );
  }

  return context;
};
