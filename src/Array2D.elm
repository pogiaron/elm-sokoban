module Array2D exposing (..)

import Array exposing (Array)

type alias Array2D a = Array (Array a)

empty : Array2D a
empty =
    Array.initialize 0 (\_ -> Array.empty)
    
addNewRow : Array2D a -> Array2D a
addNewRow array2D =
    Array.push Array.empty array2D
    
getLastRow : Array2D a -> Array a
getLastRow array2D =
    Array.get (Array.length array2D - 1) array2D |> Maybe.withDefault Array.empty
    
pushToLastRow : a -> Array2D a -> Array2D a
pushToLastRow element array2D =
    let
        lastIndex = Array.length array2D - 1
    in
    Array.indexedMap
        (\i array ->
            if i == lastIndex then
                Array.push element array
            else
                array
        ) array2D
    

get : (Int, Int) -> Array2D a -> Maybe a
get (x, y) array2D =
    Array.get y array2D |> Maybe.andThen (Array.get x)

set : (Int, Int) -> a -> Array2D a -> Array2D a
set (x, y) newVal array2D =
    Array.indexedMap 
        (\i array -> 
            if i == y then 
                Array.set x newVal array 
            else 
                array
        ) array2D

indexedMap : ((Int,Int) -> a -> b) -> Array2D a -> Array2D b
indexedMap func array2D =
    Array.indexedMap 
        (\iy array ->
            Array.indexedMap (\ix a -> func (ix,iy) a) array
        ) array2D

map : (a -> b) -> Array2D a -> Array2D b
map func array2D =
    Array.map(\array -> Array.map (\a -> func a) array) array2D

foldl : (a -> b -> b) -> b -> Array2D a -> b
foldl func acc array2D =
    let
        newAcc = case Array.get 0 array2D of
            Just array -> Array.foldl func acc array
            Nothing -> acc
    in
    case Array.length array2D of
        0 -> newAcc
        length -> foldl func newAcc (Array.slice 1 length array2D)
    
concat : Array2D a -> Array a
concat array2D =
    Array.foldr(\array -> \acc -> Array.append array acc ) Array.empty array2D

height : Array2D a -> Int
height array2D =
    Array.length array2D 

width : Array2D a -> Int
width array2D =
    Array.foldl(\array acc -> Basics.max acc (Array.length array)) 0 array2D
