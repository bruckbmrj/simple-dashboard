import { UserEntity } from "src/app/modules/admin/domain/entities/user.entity";

export interface UserStateProps {
 users: UserEntity[]
 userLogged: {
   id: string
   name: string
   email: string
 },
 token: string

}
