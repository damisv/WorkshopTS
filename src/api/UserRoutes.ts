import {Express,Request,Response} from 'express'
import {FireBaseAdmin} from '../firebase/admin'

export namespace UserRoutes {
    export function init(app:Express,firebase:FireBaseAdmin):void{
        app.get('/api/users',(req:Request,res:Response)=>{
            firebase.userActions.getAll(req.query.perPage)
                    .then((usersList)=>{
                        res.send(usersList)
                    }).catch((err)=>{res.status(500).send(err)})
        })
    }
}