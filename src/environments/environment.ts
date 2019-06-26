// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  //  apiUrl: 'http://192.168.1.110:8000/api/',
  // l2apiUrl: 'http://192.168.1.110:8000/l2api/',
  apiUrl: "http://192.168.1.223:5112/api/",
  l2apiUrl: "http://192.168.1.223:5112/l2api/",
  l3apiUrl: "http://192.168.1.223:5112/l3api/",

  apiUrlNot: "http://192.168.1.116:8002/api/",
  pdfUrl: "https://s3-ap-southeast-1.amazonaws.com/maacpd/static/pdf/",
  redirectUrl: "http://192.168.1.223:7112/#/l1/",
  downloadUrl: "http://192.168.1.223:5112"
};
