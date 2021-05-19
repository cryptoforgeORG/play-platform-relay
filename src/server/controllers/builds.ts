import axios from "axios";
import db from '../db';

export const builds = {
  fetchByBuildType: async (buildType: string) =>
    await db(`
    SELECT *
    FROM builds
    WHERE build_type = '${buildType}'
    ORDER BY id DESC
  `),
  getMasterUrl: async () => {
    let result = await builds.fetchByBuildType("StandaloneLinux64");

    let build = result[0];

    let { uses_unity_cloud_build } = build;

    let url;

    if (uses_unity_cloud_build) {
      const version = build.version;

      let buildTargetName = "masters-of-conquest-headless";

      let PROJECT = "masters-of-conquest-master";

      const shareUrl = `https://build-api.cloud.unity3d.com/api/v1/orgs/${process.env.UNITY_ORGANIZATION}/projects/${PROJECT}/buildtargets/${buildTargetName}/builds/${version}/share`;

      let response = await axios.get(shareUrl, {
        headers: { Authorization: `Basic ${process.env.TOKEN_UNITY_CLOUD}` },
      });

      const detailsUrl = `https://build-api.cloud.unity3d.com/api/v1/shares/${response.data.shareid}`;

      response = await axios.get(detailsUrl, {
        headers: { Authorization: `Basic ${process.env.TOKEN_UNITY_CLOUD}` },
      });

      url = response.data.links.artifacts[0].files[0].href;

      console.log(url);
    } else {
      url = build.url;
    }

    return {
      build,
      url,
    };
  },
};
