import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    quietDeps: true, // Suppress Bootstrap's deprecation warnings
    includePaths: [path.join(__dirname, "src/styles")],
  },
};

export default nextConfig;
