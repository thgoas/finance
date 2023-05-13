import User from "@/logic/core/user/User";
import { Auth, GoogleAuthProvider, getAuth, signInWithPopup, signOut, User as UserFirebase, onIdTokenChanged } from 'firebase/auth'
import { app } from "../config/app";

export type MonitorUser = (user: User | null) => void
export type CancelTracking = () => void

export default class Authentication {
  private _auth: Auth
  constructor () {
    this._auth = getAuth(app)
  }

  async loginGoogle(): Promise<User | null> {
    const resp = await signInWithPopup(this._auth, new GoogleAuthProvider())

    return this.convertToUser(resp.user)
  }

  logout(): Promise<void> {
    return signOut(this._auth)
  }

  toMonitor (notify: MonitorUser):CancelTracking {
    return onIdTokenChanged(this._auth, async (userFirebase) => {
      const user = this.convertToUser(userFirebase)
      notify(user)
    })
  }

  private convertToUser (userFirebase: UserFirebase | null):User | null {
    if(!userFirebase?.email) return null
    const alternativeName = userFirebase.email!.split('@')[0]

    return {
      id: userFirebase.uid,
      name: userFirebase.displayName ?? alternativeName,
      email: userFirebase.email,
      imageUrl: userFirebase.photoURL
    }
  }
}