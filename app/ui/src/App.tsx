import React, { useEffect, useState } from "react";
import CloudSelector from "./components/CloudSelector";
import { Cloud } from "./models/Cloud";
import { RemoteData, RemoteDataStatus as Status } from "./models/RemoteData";
import { CloudSelectionProvider } from "./contexts/CloudSelectionContext";
import CloudListing from "./components/CloudListing";
import { LocationButton } from "./components/LocationButton";

type CloudResponse = RemoteData<{ clouds: Cloud[] }>;

const App = () => {
  const [cloudResponse, setClouds] = useState<CloudResponse>({
    status: Status.NotAsked,
    clouds: [],
  });

  useEffect(() => {
    setClouds({ status: Status.Loading, clouds: [] });
    fetch("http://localhost:5000/api/v1/clouds").then(async (resp) => {
      if (!resp.ok) {
        setClouds({ status: Status.Failure, clouds: [] });
      }

      const result = await resp.json();
      if (!Array.isArray(result.clouds)) {
        setClouds({ status: Status.Failure, clouds: [] });
      } else {
        setClouds({ status: Status.Success, clouds: result.clouds });
      }
    });
  }, []);

  return (
    <CloudSelectionProvider>
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "1em",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <CloudSelector clouds={cloudResponse.clouds} />
          <LocationButton />
        </div>
        <ResultSwitch cloudResponse={cloudResponse} />
      </div>
    </CloudSelectionProvider>
  );
};

type ResultSwitchProps = { cloudResponse: CloudResponse };

const ResultSwitch = ({ cloudResponse }: ResultSwitchProps) => {
  switch (cloudResponse.status) {
    case Status.NotAsked:
      return <LoadingPlaceholder />;
    case Status.Loading:
      return <LoadingPlaceholder />;
    case Status.Failure:
      return <ErrorPlaceholder />;
    case Status.Success:
      return <CloudListing clouds={cloudResponse.clouds} />;
    default:
      console.error(
        `Invalid cloud reponse status: ${
          cloudResponse.status
        }. Full data: ${JSON.stringify(cloudResponse)}.`
      );
      return <ErrorPlaceholder />;
  }
};

const LoadingPlaceholder = () => <div>Loading...</div>;

const ErrorPlaceholder = () => <div>Error!</div>;

export default App;
