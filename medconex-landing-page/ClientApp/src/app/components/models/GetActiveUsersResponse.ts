export class GetActiveUsersResponse {
  activeUsers: ActiveUserModel[];
}

export class ActiveUserModel {
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  paidSubscriber: boolean = false;
}
