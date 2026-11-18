import appConfig from "../../app.json";
import releaseConfig from "../../release/android-release.json";

export const appInformation = {
  name: appConfig.expo.name,
  version: appConfig.expo.version,
  supportEmail: releaseConfig.supportEmail,
  supportSubject: `${appConfig.expo.name} ${appConfig.expo.version} — support`,
};
