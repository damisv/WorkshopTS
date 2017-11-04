import {Express,Request,Response} from 'express'
import {AuthRequest} from '../security/firebaseAuth'
import {FireBaseAdmin} from '../firebase/admin'
import {Pokemon} from '../models/pokemon'
import {authMiddlewareFactory} from '../security/firebaseAuth'


export namespace PokemonRoutes {
    export function init(app:Express,firebase:FireBaseAdmin):void{
        const authMiddleware = authMiddlewareFactory(firebase)
        app.get('/api/pokemons',authMiddleware,(req:AuthRequest,res:Response)=>{
            firebase.pokemonActions.getAll(req.user.id)
                    .then((pokemonList)=>{
                        res.send(pokemonList)
                    }).catch((err)=>{res.status(500).send(err)})
        })
        app.get('/api/pokemon/:pokemonId',authMiddleware,(req:AuthRequest,res:Response)=>{
            firebase.pokemonActions.getOne(req.user.id,req.params.pokemonId)
                    .then((pokemon)=>{
                        res.send(pokemon)
                    }).catch((err)=>{res.status(500).send(err)})
        })
        app.post('/api/pokemon',authMiddleware,(req:AuthRequest,res:Response)=>{
            try{
                const newPokemon = new Pokemon(req.body)
                firebase.pokemonActions.addPokemon(req.user.id,newPokemon)
                        .then((snap)=>{
                            res.send({succes:true,pokemon:Object.assign({id:snap.key},newPokemon)}
                        )})
                            .catch((err)=>{res.status(500).send(`catch ${err}`)})
            }catch (err){
                res.status(500).send(`try pokemon ${err}`)
            }
        })
        app.put('/api/pokemon/:pokemonId',authMiddleware,(req:AuthRequest,res:Response)=>{
            firebase.pokemonActions.updatePokemon(req.user.id,req.params.pokemonId,req.body)
                    .then(()=>{
                        res.send({succes:true})
                    }).catch((err)=>{res.status(500).send(err)})
        })
        app.delete('/api/pokemon/:pokemonId',authMiddleware,(req:AuthRequest,res:Response)=>{
            firebase.pokemonActions.deletePokemon(req.user.id,req.params.pokemonId)
                    .then(()=>{
                        res.send({succes:true})
                    }).catch((err)=>{res.status(500).send(err)})
        })

    }
}