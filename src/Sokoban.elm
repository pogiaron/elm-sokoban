module Sokoban exposing (Game, GameState(..), MapElement(..), Map, Dir(..), nextState, undo, init, mapsParser, maps)

import Array2D exposing (Array2D)
import Set exposing (Set)
import Parser exposing (Parser, (|.), (|=), DeadEnd)

type alias Game =
    { map: Map
    , gameState: GameState
    , stepCount: Int
    , changes: List Change
    }

type GameState 
    = Win
    | Running

type MapElement 
    = Wall
    | Floor
    | Void

type alias Map =
    { hero : (Int, Int)
    , boxes : Set (Int, Int)
    , boxTargets : Set (Int, Int)
    , wallsAndFloors : Array2D MapElement
    , name : String
    }

type alias Change = 
    { hero: (Int,Int)
    , boxes: Set (Int,Int)
    }

type Dir 
    = Up 
    | Down 
    | Left 
    | Right

type Object
    = Floor_
    | Box_
    | Wall_

-- type MapElement 
--    = WallE
--    | FloorE
--    | VoidE
--    | BoxE
--    | BoxTargetE
--    | HeroE

-- type Sokoban = Array2D MapElement
-- coordinateFold (\(x,y) elements -> ) map
-- coordinateFold : ((Int,Int) -> b -> b) -> Map -> b

--indexedFoldl : ((Int,Int) -> a -> b -> b) -> b -> Array2D MapElement -> b
--indexedFoldl func acc Map =
-- map : Map -> Array2D MapElement
{- map Map =
    Array2D.indexedMap(\(x,y) element -> 
        if (x,y) == Map.hero then
            HeroE
        else if Set.member (x,y) Map.boxes then
            BoxE
        else if Set.member (x,y) Map.boxTargets then
            BoxTargetE
        else
            case element of
                Floor -> FloorE
                Wall -> WallE
                Void -> VoidE
    )
-}
init : Map -> Game 
init map =
    Game map Running 0 []
nextState : Dir -> Game -> Game
nextState dir game =
    let
        mapNextState = moveHero dir game.map
    in
        case mapNextState of
            Just state -> 
                Game state (getGameState state) (game.stepCount+1) (Change game.map.hero game.map.boxes :: game.changes)
            Nothing -> 
                game

undo : Game -> Game
undo {map, gameState, stepCount, changes } =
        case changes of
            lastState :: rest ->
                Game {map | hero = lastState.hero, boxes = lastState.boxes } gameState (stepCount-1) rest
            [] -> 
                Game map gameState stepCount changes
     

moveHero : Dir -> Map -> Maybe Map
moveHero dir map =
    let
        heroNextPos = move dir map.hero
    in
    case objectAtDir heroNextPos map of
        Box_ ->
            let
                boxNewPos = move dir heroNextPos
            in
            case objectAtDir boxNewPos map of
                Floor_ -> Just <| { map | hero = heroNextPos, boxes = updateBoxAt heroNextPos boxNewPos map.boxes }
                _ -> Nothing
        Floor_ -> 
            Just <| { map | hero = heroNextPos }
        Wall_ -> 
            Nothing

objectAtDir : (Int,Int) -> Map -> Object
objectAtDir position map =
    let
        objectInPos = Array2D.get position map.wallsAndFloors |> Maybe.withDefault Void
    in
        case objectInPos of
            Floor ->
                if hasBox position map.boxes then
                    Box_
                else
                    Floor_
            _ ->
                Wall_

move: Dir -> (Int, Int) -> (Int, Int)
move dir (x,y) =
    case dir of
        Up -> (x, y-1)
        Down -> (x, y+1)
        Right -> (x+1, y)
        Left -> (x-1, y)

addBox : (Int,Int) -> Map -> Map
addBox box sokoban =
    { sokoban | boxes = Set.insert box sokoban.boxes }
    
addBoxTarget : (Int,Int) -> Map -> Map
addBoxTarget boxTarget map =
    { map | boxTargets = Set.insert boxTarget map.boxTargets }
    
addHero : (Int,Int) -> Map -> Map
addHero hero sokoban =
    { sokoban | hero = hero }

addFloor : Map -> Map
addFloor map =
    { map | wallsAndFloors = Array2D.pushToLastRow Floor map.wallsAndFloors }

addVoid : Map -> Map
addVoid map =
    { map | wallsAndFloors = Array2D.pushToLastRow Void map.wallsAndFloors }

addWall : Map -> Map
addWall map =
    { map | wallsAndFloors = Array2D.pushToLastRow Wall map.wallsAndFloors }

updateBoxAt : (Int,Int) -> (Int, Int) -> Set (Int, Int) -> Set (Int, Int)
updateBoxAt oldPos newPos boxes =
    boxes
    |> Set.remove oldPos
    |> Set.insert newPos

hasBox : (Int,Int) -> Set (Int, Int) -> Bool 
hasBox pos boxes =
    Set.member pos boxes

getGameState : Map -> GameState
getGameState sokoban =
    if sokoban.boxes == sokoban.boxTargets then
        Win
    else
        Running


-- MAPS PARSER
mapsParser : Parser (List Map)
mapsParser =
    Parser.loop [] mapsParserHelp

mapsParserHelp : List Map -> Parser (Parser.Step (List Map) (List Map))
mapsParserHelp revMaps =
    Parser.oneOf 
        [ Parser.succeed (\map -> Parser.Loop (map :: revMaps))
            |= mapAndNameParser
            |. newLine
            |. newLine
        , Parser.succeed ()
            |> Parser.map (\_ -> Parser.Done (List.reverse revMaps))
        ]

type alias LoopState = 
    { afterHashTag : Bool
    , map: Map
    , x : Int
    , y : Int
    }

mapAndNameParser : Parser Map
mapAndNameParser =
    Parser.succeed (\map mapName -> { map | name = mapName })
        |= mapParser
        |. Parser.symbol ";"
        |. Parser.spaces
        |= mapNameParser

mapNameParser : Parser String
mapNameParser =
    Parser.getChompedString <|
        Parser.succeed ()
            |. Parser.chompUntil "\n"

mapParser : Parser Map
mapParser =
    Parser.loop (LoopState False (Map (0,0) Set.empty Set.empty (Array2D.addNewRow Array2D.empty) "") 0 0) mapParserHelp
    |> Parser.map (\loopState -> loopState.map)

mapParserHelp : LoopState -> Parser (Parser.Step (LoopState) (LoopState))
mapParserHelp loopState =
    Parser.oneOf
        [ Parser.succeed (\_ -> Parser.Loop (nextStateForSpace loopState))
            |= space
        , Parser.succeed (\_ -> Parser.Loop (nextStateForWall loopState))
            |= Parser.symbol "#"
        , Parser.succeed (\_ -> Parser.Loop (nextStateForHero loopState))
            |= Parser.symbol "@"
        , Parser.succeed (\_ -> Parser.Loop (nextStateForBox loopState))
            |= Parser.symbol "$"
        , Parser.succeed (\_ -> Parser.Loop (nextStateForBoxTarget loopState))
            |= Parser.symbol "."
        , Parser.succeed (\_ -> Parser.Loop (nextStateForBoxAndBoxTarget loopState))
            |= Parser.symbol "*"
        , Parser.succeed (\_ -> Parser.Loop (nextStateForHeroAndBoxTarget loopState))
            |= Parser.symbol "+"
        , Parser.succeed (\_ -> Parser.Loop (nextStateForNewLine loopState))
            |= newLine
        , Parser.succeed ()
            |> Parser.map (\_ -> Parser.Done loopState)
        ]

-- space can mean two different things depending on the context
nextStateForSpace : LoopState -> LoopState
nextStateForSpace { afterHashTag, map, x, y } =
    if afterHashTag then
        LoopState afterHashTag (map |> addFloor) (x+1) y
    else
        LoopState afterHashTag (map |> addVoid) (x+1) y

nextStateForWall : LoopState -> LoopState
nextStateForWall { map, x, y } =
    LoopState True (map |> addWall ) (x+1) y

nextStateForBox : LoopState -> LoopState
nextStateForBox { afterHashTag, map, x, y } =
    LoopState afterHashTag (map |> addFloor |> addBox (x,y) ) (x+1) y

nextStateForHero : LoopState -> LoopState
nextStateForHero { afterHashTag, map, x, y } =
    LoopState afterHashTag (map |> addFloor |> addHero (x,y) ) (x+1) y

nextStateForBoxTarget : LoopState -> LoopState
nextStateForBoxTarget { afterHashTag, map, x, y } =
    LoopState afterHashTag (map |> addFloor |> addBoxTarget (x,y) ) (x+1) y

nextStateForHeroAndBoxTarget : LoopState -> LoopState
nextStateForHeroAndBoxTarget { afterHashTag, map, x, y} =
    LoopState afterHashTag (map |> addFloor |> addHero (x,y) |> addBoxTarget (x,y) ) (x+1) y

nextStateForBoxAndBoxTarget : LoopState -> LoopState
nextStateForBoxAndBoxTarget { afterHashTag, map, x, y} =
    LoopState afterHashTag (map |> addFloor |> addBox (x,y) |> addBoxTarget (x,y) ) (x+1) y

nextStateForNewLine : LoopState -> LoopState
nextStateForNewLine { map, y } =
    LoopState False { map | wallsAndFloors = Array2D.addNewRow map.wallsAndFloors } 0 (y+1)

newLine : Parser ()
newLine =
    Parser.succeed ()
        --|. Parser.chompIf (\c -> c == '\r')
        |. Parser.chompIf (\c -> c == '\n')

space : Parser ()
space =
     Parser.chompIf (\c -> c == ' ')