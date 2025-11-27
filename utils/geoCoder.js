import NodeGeocoder from "node-geocoder";
const options = {
  provider: process.env.GEO_CODER_PROVIDER||"mapquest",
  httpAdapter: 'https', // Default
  apiKey: process.env.GEO_CODER_PROVIDER_API_KEY||"kuKCK4sGya4pe4Rm2Kqv2y4A0N9TqmGM", // for Mapquest, OpenCage, APlace, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);
export default geocoder;