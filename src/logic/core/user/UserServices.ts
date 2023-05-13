import Authentication, { CancelTracking, MonitorUser } from "@/logic/firebase/auth/Authentication";
import Collection from "@/logic/firebase/db/Collection";
import User from "./User";

export default class UserServices {
  private _authentication = new Authentication()
  private _collection = new Collection()

  monitorAuthentication (notify: MonitorUser):CancelTracking {
    return this._authentication.toMonitor(async user => {
      notify(user ? {
        ...user,
        ...await this.query(user.email)
      }: null)
    })
  }

  async loginGoogle(): Promise<User | null> {
    const user = await this._authentication.loginGoogle()
    if(!user) return null

    let userForBank = await this.query(user.email)
    if(!userForBank) userForBank = await this.save(user)

    return {  ...user, ...userForBank }
  }

  logout(): Promise<void> {
    return this._authentication.logout()
  }

  async query(email: string){
    return await this._collection.queryById('users', email)
  }

  async save(user: User): Promise<User> {
    return await this._collection.save('users', user, user.email)
  }

}