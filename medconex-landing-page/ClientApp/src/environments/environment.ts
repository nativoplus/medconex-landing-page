// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  SGWidgetDataTokenForSubscription: '386861fc73d055b997659cec39eb43d2',
  contactUsSendgridTemplateId : 'd-bfa29044f7754659a2dbd5d6e3877819',
  reCaptchaKey: '6LcXIa8UAAAAAM8MRf7dtgNz-oLIWEMpS8oHHmB8',
  adminRoleId: 'b7e0849f-d2d5-483d-85cd-d33a7d9d018d',
  kinveyAppKey: 'kid_ryZl8bRDm',
  kinveyAppSecret: '1c6e98663ec6493ab8cdd06e09b27714',
  kinveyMasterSecret: '316e4a553d4c426db93a52c29ffc1905',
  api: {
    contactUsApi: 'https://nativoplusemailapi.azurewebsites.net/api/v1.0/Email/send_email_template',
    kinveyAdminMembersApi: 'https://baas.kinvey.com/roles/kid_ryZl8bRDm/b7e0849f-d2d5-483d-85cd-d33a7d9d018d/membership',
    getActiveUsersApi: 'https://mobilehmmapi.azurewebsites.net/api/v1.0/users/getactiveusers',
    getMedicationsApi: 'https://mobilehmmapi.azurewebsites.net/api/v1.0/medications/getmedicationsadherence'
  },
  contactUs: {
    senderEmail: 'angelmartinez.la@gmail.com',
    ccList: ['ncorecarbon@gmail.com']
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
