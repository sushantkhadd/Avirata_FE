// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,  
  apiUrl: "http://3.110.216.210:8001/api/", 
  
  // apiUrl: "http://3.110.216.210:8001/api/",
  l2apiUrl: "http://3.110.216.210:8001/l2api/",
  l3apiUrl: "http://3.110.216.210:8001/l4api/",
  l4apiUrl: "http://3.110.216.210:8001/l4api/",


  apiUrlNot: "http://192.168.1.116:8002/api/",
  pdfUrl: "https://s3-ap-southeast-1.amazonaws.com/maacpd/static/pdf/",
  redirectUrl1: "http://192.168.1.223:7112/#/l1/",
  redirectUrl2: "http://192.168.1.223:7114/#/l2/",
  downloadUrl: "http://3.110.216.210:8001"
};
