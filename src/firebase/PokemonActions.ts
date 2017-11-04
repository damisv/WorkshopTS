import * as admin from 'firebase-admin'
import {Pokemon} from '../models/pokemon'

export class PokemonActions{
    firebase:admin.app.App
    dbRef:admin.database.Reference

    constructor(firebase:admin.app.App){
        this.firebase = firebase
        this.dbRef = firebase.database().ref('workshop-typescript').child('pokemons')
    }

    public getAll(userId:string):Promise<Pokemon[]>{
            return new Promise((resolve:(value:Pokemon[])=>void,reject:(err:any)=>void)=>{
                this.dbRef.child(userId).once('value',(snap)=>{  
                    const pokes = snap.val()
                    const pokesArray:Pokemon[] = []
                        for(const key in pokes){
                            if(pokes.hasOwnProperty(key)){
                                pokesArray.push(Object.assign({id:key},pokes[key]))
                            }
                        }
                        resolve(pokesArray)
                })
            }) 
    }

    public getOne(userId:string,id:string):Promise<Pokemon>{
        return new Promise((resolve:(value:Pokemon)=>void,reject:(err:any)=>void)=>{
            this.dbRef.child(userId).child(id).once('value',(snap)=>{
                resolve(snap.val())
            })
        }) 
    }
    public addPokemon(userId:string,poke:Pokemon):Promise<admin.database.ThenableReference>{
        return this.dbRef.child(userId).push(poke)
    }
    public updatePokemon(userId:string,id:string,poke:Pokemon):Promise<void>{
        return this.dbRef.child(userId).child(id).update(poke)
    }
    public deletePokemon(userId:string,id:string):Promise<void>{
        return this.dbRef.child(userId).child(id).remove()
    }
}