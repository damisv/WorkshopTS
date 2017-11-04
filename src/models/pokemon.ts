import {Equals} from './equals'
import {Gender,validateGender} from '../constants/Gender'

export class Pokemon implements Equals<Pokemon>{
    public id?: string
    public name:string
    public height:string
    public weight:string
    public gender:Gender
    public abilities:string
    constructor(maybePokemon:Pokemon){
        this.name = maybePokemon.name
        this.height = maybePokemon.height
        this.weight = maybePokemon.weight
        validateGender(maybePokemon.gender)
        this.gender = maybePokemon.gender
        this.abilities = maybePokemon.abilities
    }
    public canEqual(that:Pokemon):boolean{
        return this.name === that.name
    }
    public equals(that:Pokemon):boolean{
        return this.canEqual(that) && this.abilities === that.abilities
    }
}