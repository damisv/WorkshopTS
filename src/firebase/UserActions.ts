import * as admin from 'firebase-admin'

export class UserActions {
    firebase:admin.app.App
    constructor(firebase:admin.app.App){
        this.firebase = firebase
    }
    public getAll(perPage:number = 50):Promise<admin.auth.ListUsersResult>{
        return this.firebase.auth().listUsers(perPage)
    }
    public decodeToken(idToken:string):Promise<admin.auth.DecodedIdToken>{
        return this.firebase.auth().verifyIdToken(idToken)
    }
}