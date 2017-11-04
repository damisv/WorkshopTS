import {Request,Response,NextFunction} from 'express'
import {FireBaseAdmin} from '../firebase/admin'
import * as admin from 'firebase-admin'

export interface AuthRequest extends Request {
    user: admin.auth.DecodedIdToken
}

export function authMiddlewareFactory(firebase:FireBaseAdmin){
    return function(req:AuthRequest,res:Response,next:NextFunction){
        const authToken = req.headers['x-auth'] || req.query['x-auth']
        if(authToken){
            firebase.userActions.decodeToken(authToken)
                    .then((user)=>{
                            req.user = user
                            next()
                    }).catch((err)=>{res.status(401).send({message:'Invalid Token!'})})
        }else{
            res.status(401).send({message:'No auth token provided!'})
        }
    }
}