import { EntityBase } from "src/app/modules/shared/models/base.entity";

export class UserEntity extends EntityBase {
  name: string;
  email: string;
  password: string;


  static fromJson(json): UserEntity {
    const user = Object.assign(new UserEntity(), json)
    return user
  }
}
