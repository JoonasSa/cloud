from http.client import HTTPResponse, HTTPSConnection, error
import json
from typing import List, Optional

AIVEN_API_URL = "api.aiven.io"

# we should cache this response for long time in case the api breaks
def fetch_clouds() -> List[dict]:
    conn = HTTPSConnection(AIVEN_API_URL)

    conn.request("GET", "/v1/clouds")

    res = conn.getresponse()
    if res.status != 200:
        raise error

    return { 'clouds': parse_cloud_response(res) }

def parse_cloud_response(res: HTTPResponse):
    parsed_json = json.load(res)
    cloud_opts = map(parse_to_opt_cloud, parsed_json['clouds'])
    valid_clouds = list(filter(lambda cloud_opt: cloud_opt != None, cloud_opts))

    print(len(parsed_json['clouds']), len(valid_clouds))

    # what if contains parsed_json.errors?
    # what is parsed_json.message?
    return valid_clouds

KNOWN_CLOUD_RPOVIDERS = [
    'azure', 'aws', 'google', 'do', 'upcloud'
]

FULL_PROVIDER_NAMES = {
    'azure': 'Microsoft Azure',
    'aws': 'Amazon Web Services (AWS)',
    'google': 'Google Cloud Platform (GCP)',
    'do': 'DiginalOcean',
    'upcloud': 'UpCloud'
}

# TODO: does it make sense to have a list of valid cloud providers?
def parse_to_opt_cloud(cloud: dict) -> Optional[dict]:
    try:
        provider_name = cloud['cloud_name'].split("-")[0]
        if provider_name in KNOWN_CLOUD_RPOVIDERS:
            return {
                'cloud_provider_id': provider_name,
                'cloud_provider_name': FULL_PROVIDER_NAMES[provider_name], 
                'cloud_description': cloud['cloud_description'],
                'cloud_name': cloud['cloud_name'],
                'geo_latitude': cloud['geo_latitude'],
                'geo_longitude': cloud['geo_longitude'],
                'geo_region': cloud['geo_region']
            }
        else:
            raise Exception(f'Unknown cloud provider "{provider_name}" parsed from "{cloud.cloud_name}"')

    except Exception as err:
        print(f"parse_to_opt_cloud exception: {err}")
        return None
