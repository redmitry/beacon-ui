import config from "../../config/config.json";
import BeaconNetworkBanner from "./BeaconNetworkBanner";
import SingleBeaconBanner from "./SingleBeaconBanner";
import { Box } from "@mui/material";

export default function BeaconTypeBanner() {
  const beaconType = config.beaconType;

  const sharedStyles = {
    boxShadow: "0px 8px 11px 0px #9BA0AB24",
    minHeight: "218px",
    width: "100%",
    borderRadius: "12px",
    overflow: "hidden",
    mb: 3,
    backgroundColor: "transparent",
  };

  let content = null;

  if (beaconType === "networkBeacon") {
    content = <BeaconNetworkBanner />;
  } else if (beaconType === "singleBeacon") {
    content = <SingleBeaconBanner />;
  }

  if (!content) return null;

  return <Box sx={sharedStyles}>{content}</Box>;
}
