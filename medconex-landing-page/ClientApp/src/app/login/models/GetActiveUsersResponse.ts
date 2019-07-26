export class GetActiveUsersResponse {
  activeUsers: ActiveUsersModel[];
}

export class ActiveUsersModel {
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  paidSubscriber: boolean = false;
}
