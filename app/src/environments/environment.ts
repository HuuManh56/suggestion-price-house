// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import env from "./.env";
export const UrlConfig: any = {
  localApi: "http://127.0.0.1:5000",
  clientAddress: "http://localhost:4200"
};
export const environment = {
  production: false,
  version: env.npm_package_version + "-dev",
  serverUrl: {
    ess: "http://127.0.0.1:5000/api",
    oauth: "http://localhost:8880/api-oauth"
  }
};

/** Config default variable */
export const ConfigDefault = {
  dateFormat: "dd/MM/yyyy"
};
