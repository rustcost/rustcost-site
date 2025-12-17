import type { DownloadProduct } from "@/types/download";

export const HELM_INSTALL_COMMAND = `helm repo add rustcost https://rustcost.github.io/rustcost-helmchart/
helm repo update
helm upgrade --install rustcost rustcost/rustcost -n rustcost --create-namespace --version 1.0.0-dev.14`;

export const CORE_IMAGE_NAME = "rustcost/core";
export const DASHBOARD_IMAGE_NAME = "rustcost/dashboard";

export const CORE_REPOSITORY_URL = "https://github.com/rustcost/rustcost-core";
export const DASHBOARD_REPOSITORY_URL =
  "https://github.com/rustcost/rustcost-dashboard";

export const DOWNLOAD_PRODUCTS: DownloadProduct[] = [
  {
    id: "core",
    title: "RustCost Core",
    image: CORE_IMAGE_NAME,
    repo: CORE_REPOSITORY_URL,
  },
  {
    id: "dashboard",
    title: "RustCost Dashboard",
    image: DASHBOARD_IMAGE_NAME,
    repo: DASHBOARD_REPOSITORY_URL,
  },
];
