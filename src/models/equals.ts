export interface Equals<T> {
    equals(that:T):boolean
    canEqual(that:T):boolean
}