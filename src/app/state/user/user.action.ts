import { CreateUserDTO } from "./dtos/create-user.dto"
import { LoginRequest } from "./dtos/login.dto"
import { UpdateUserDTO } from "./dtos/update-user.dto"

export class GetAllUsers {
  static readonly type = '[User] Get all users'
  constructor() {}
}

export class GetUserById {
  static readonly type = '[User] get user by id'
  constructor(public userId: string) {}
}

export class CreateUser {
  static readonly type = '[User] create new user'
  constructor(public payload: CreateUserDTO) {}
}

export class UpdateUsers {
  static readonly type = '[User] update user'
  constructor(public payload: UpdateUserDTO) {}
}

export class DeleteUsers {
  static readonly type = '[User] delete user'
  constructor(public userId: string) {}
}

export class Login {
  static readonly type = '[Auth] login'
  constructor(public loginProps: LoginRequest) {}
}

export class Logout {
  static readonly type = '[Auth] logout'
  constructor() {}
}

