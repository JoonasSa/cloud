from __future__ import annotations
import json

# TODO: actually use these classes
class RawCloud():
    cloud_description: str
    cloud_name: str
    geo_latitude: float
    geo_longitude: float
    geo_region: str

class ParsedCloud():
    cloud_provider_id: str
    cloud_provider_name: str
    cloud_description: str
    cloud_name: str
    geo_latitude: float
    geo_longitude: float
    geo_region: str

    def __init__(self, cloud_provider_id, cloud_provider_name, cloud_description, cloud_name, geo_latitude, geo_longitude, geo_region) -> ParsedCloud:
        self.cloud_provider_id = cloud_provider_id
        self.cloud_provider_name = cloud_provider_name
        self.cloud_description = cloud_description
        self.cloud_name = cloud_name
        self.geo_latitude = geo_latitude
        self.geo_longitude = geo_longitude
        self.geo_region = geo_region

    # TODO: doesn't work 
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
