module Main exposing (main)

import Browser
import Browser.Events
import Html exposing (Html, div, text, h1, a)
import Html.Events exposing (onClick)
import Html.Attributes exposing (class, href, target)

import Svg exposing (svg, rect, g, circle, text_, polygon)
import Svg.Attributes exposing (cx, cy, r, x, y, width, height, viewBox, rx, ry, fill, stroke, fillOpacity, fontSize, points)
import Svg.Events
import Svg exposing (Svg)

import Json.Decode as Decode

import Array
import Parser
import Set
import Task
import Time
import Http

import Sokoban
import SokobanLevels exposing (..)
import Array2D
import Timer

-- completedMaps : Dict String CompletedMap
-- type alias CompletedMap =
--    { mapName: String
--    , time: Time.Posix
--    , moves: Int
--    }

type Model
    = SelectLevel (List SokobanLevel)
    | SelectMap LoadMaps
    | Play (List Sokoban.Map) Timer.Timer Sokoban.Game

type LoadMaps 
    = HttpFailure
    | Loading
    | ParsingFailed (List Parser.DeadEnd) 
    | Success (List Sokoban.Map)

-- HTTP
getSokobanMaps : String -> Cmd Msg
getSokobanMaps url =
  Http.get
    { url = "https://cors-anywhere.herokuapp.com/" ++ url
    , expect = Http.expectString GotSokobanMaps
    }

init : () -> (Model, Cmd Msg)
init _ =
    (SelectLevel SokobanLevels.sokobanLevels, Cmd.none)

type Msg
    = GetSokobanMaps String
    | GotSokobanMaps (Result Http.Error String)
    | Select Sokoban.Map
    | MoveHero Sokoban.Dir
    | Restart
    | UndoStep
    | BackToMaps
    | GotTimerMsg Timer.Msg


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        GetSokobanMaps url ->
            (SelectMap Loading, getSokobanMaps url)
        GotSokobanMaps result ->
            case result of
               Ok maps -> 
                    case Parser.run Sokoban.mapsParser maps of 
                        Ok sokobanMaps -> 
                            (SelectMap (Success sokobanMaps), Cmd.none)
                        Err err -> 
                            (SelectMap (ParsingFailed err), Cmd.none)
               Err err -> 
                    (SelectMap HttpFailure, Cmd.none)
        Select sokobanMap ->
            case model of
                SelectMap loadMaps ->
                    case loadMaps of 
                        Success maps ->
                            ( Play maps Timer.create (Sokoban.init sokobanMap)
                            , Cmd.map GotTimerMsg (Task.perform Timer.StartTime Time.now)
                            )
                        _ -> (model, Cmd.none)
                _ -> 
                    (model, Cmd.none)
        MoveHero dir ->
            case model of
                Play maps timer game ->
                    let
                        next = Sokoban.nextState dir game
                    in
                        case next.gameState of
                            Sokoban.Win ->
                                (Play maps timer next, Cmd.map GotTimerMsg (Task.perform Timer.StopTime Time.now))
                            Sokoban.Running ->
                                (Play maps timer next, Cmd.none)
                
                _ ->
                    (model, Cmd.none)
        Restart ->
            case model of
                Play maps _ game ->
                    let
                        originalMap = maps 
                            |> List.filter (\map -> map.name == game.map.name) 
                            |> List.head 
                            |> Maybe.withDefault (Sokoban.Map (0,0) Set.empty Set.empty Array2D.empty "")
                    in
                        (Play maps Timer.create (Sokoban.init originalMap)
                        , Cmd.map GotTimerMsg (Task.perform Timer.StartTime Time.now)
                        )
                _ ->
                    (model, Cmd.none)
        UndoStep ->
            case model of
                Play maps timer game ->
                    (Play maps timer (Sokoban.undo game), Cmd.none)
                _ ->
                    (model, Cmd.none)
        BackToMaps ->
            case model of
                Play maps _ _ ->
                    (SelectMap (Success maps), Cmd.none)
                _ ->
                    (model, Cmd.none)
        GotTimerMsg timerMsg ->
            case model of
                Play maps timer game ->
                    let
                        (nTimer, cmd) = Timer.update timerMsg timer
                    in
                    (Play maps nTimer game, Cmd.map GotTimerMsg cmd)
                _ ->
                    (model, Cmd.none)       


view : Model -> Html Msg
view model =
    case model of
        SelectLevel levels ->
            div [ class "level-select" ]
                ([ h1 [ class "level-select-header" ] 
                    [ text "Sokoban levels" ]
                , a [ class "levels-source", href "https://www.sourcecode.se/sokoban/levels", target "_blank" ]
                    [ text "(Levels source https://www.sourcecode.se/sokoban/levels)"]
                , div [ class "level"]
                    [ div [class "info"] [text "Title"]
                    , div [class "info"] [text "Date"]
                    , div [class "info"] [text "Number of levels"]
                    , div [class "info"] [text "Author"]
                    , div [class "desc"] [text "Description"]
                    ]
                ] ++ List.map (\level -> viewLevel level) levels)
        SelectMap loadMaps ->
            case loadMaps of
                HttpFailure -> 
                    text "Http failed"
                Loading -> 
                    text "Loading..."
                ParsingFailed err ->
                    text (Debug.toString err)      
                Success maps ->
                    div [ class "map-select" ]
                        (List.map(\sokoban -> viewMiniMap sokoban) maps)
        Play _ time game ->
            div [ class "centered" ] 
                [ div [ class "d-flex mb-10 mt-10 menu" ] 
                    [ div [ class "f-25 mr-20 as-center" ] [ text game.map.name ]
                    , menu game.stepCount
                    ]
                , viewSokoban time game 
                ]

viewLevel : SokobanLevel -> Html Msg 
viewLevel sokobanLevel =
    div [ class "level", onClick <| GetSokobanMaps sokobanLevel.link]
        [ div [class "info"] [text sokobanLevel.title]
        , div [class "info"] [text sokobanLevel.date]
        , div [class "info"] [text <| String.fromInt <| sokobanLevel.numberOfLevels]
        , div [class "info"] [text sokobanLevel.author]
        , div [class "desc"] [text sokobanLevel.description]
        ]

viewMiniMap : Sokoban.Map -> Html Msg
viewMiniMap map =
    let
        mapWidth = (Array2D.width map.wallsAndFloors) * 15
        mapHeight = (Array2D.height map.wallsAndFloors) * 15
    in
    div []
        [ div [] [ text map.name]
        , svg 
            [ width "80%"
            , height "30vh"
            , viewBox ("0 0 " ++ String.fromInt(mapWidth*3) ++ " " ++ String.fromInt(mapHeight*3))
            , Svg.Events.onClick (Select map)
            ]
            (svgSokobanMap map)
        ]

menu : Int -> Html Msg
menu stepCount =
    svg [ width "300", height "50", viewBox "0 0 300 50" ]
        [ svgBackButton 25 12
        , svgRestartButton 100 0
        , svgMoves 175 0 stepCount
        , svgUndoButton 
        ]

svgUndoButton : Svg Msg
svgUndoButton =
    g [ onClick UndoStep ]
        [ polygon [ points "250,25 275,0 275,50", fill "darkred", stroke "#522200" ] []
        , polygon [ points "275,25 300,0 300,50", fill "darkred", stroke "#522200" ] []
        ]

svgRestartButton : Int -> Int -> Svg Msg
svgRestartButton x_ y_ =
    g [ onClick Restart ]
        [ svgRect x_ y_ 50 45 "#d2b48c" "#522200" ""
        , text_ [x (String.fromInt (x_+2)), y (String.fromInt(y_+22)), fill "#522200"] [ Svg.text "Restart"]
        ]
svgMoves : Int -> Int -> Int -> Svg Msg
svgMoves x_ y_ stepCount =
    g [] 
        [ svgRect x_ y_ 50 45 "#d2b48c" "#522200" ""
        , text_ [x (String.fromInt (x_+2)), y (String.fromInt (y_+22)), fill "#522200"] [ Svg.text "Moves:"]
        , text_ [x (String.fromInt (x_+18)), y (String.fromInt (y_+35)), fill "#522200"] [ Svg.text (String.fromInt stepCount)]
        ]

svgBackButton : Int -> Int -> Svg Msg
svgBackButton x y =
    g [ onClick BackToMaps, fill "#d2b48c" ]
        [ svgRect x y 50 25 "" "#522200" ""
        , polygon [ points "0,25 25,0 25 50", fill "", stroke "#522200" ] []
        , svgRect 12 13 24 24 "" "" ""
        ]

viewSokoban : Timer.Timer -> Sokoban.Game -> Html Msg
viewSokoban timer sokoban =
    let
        mapWidth = String.fromInt <| Array2D.width sokoban.map.wallsAndFloors * 40
        mapHeight = String.fromInt <| Array2D.height sokoban.map.wallsAndFloors * 40
    in
    svg 
        [ width "96vh"
        , height "90vh"
        , viewBox ("0 0 " ++ mapWidth ++ " " ++ mapHeight)
        ]
         (case sokoban.gameState of
             Sokoban.Win -> svgSokobanMap sokoban.map ++ (winDialog timer sokoban.stepCount)
             Sokoban.Running -> (svgSokobanMap sokoban.map)
         )
         


winDialog : Timer.Timer -> Int -> List (Html Msg)
winDialog timer moves =    
    [ svgRect 100 100 200 100 "#ffe4c4" "black" "0.8"
    , text_ [ x "140", y "140", fill "black", fontSize "20"] [ Svg.text "Congratulations!" ]
    , text_ [x "140", y "160", fill "black", fontSize "20"] [ Svg.text ("Moves: " ++ String.fromInt moves)]
    , text_ [x "140", y "180", fill "black", fontSize "20"] [ Svg.text ("Time: " ++ (Maybe.withDefault "" <| Timer.elapsedTimeString timer))]
    ]

svgSokobanMap : Sokoban.Map -> List (Html Msg)
svgSokobanMap sokobanMap =
    Array2D.indexedMap (\(x,y) mapElement ->
        if (x,y) == sokobanMap.hero && Set.member (x,y) sokobanMap.boxTargets then
            sokobanFloor (x*40) (y*40) 40 ++ sokobanBoxTarget (x*40) (y*40) 40 ++ sokobanHero (x*40) (y*40) 40
        else if (x,y) == sokobanMap.hero then
            sokobanFloor (x*40) (y*40) 40 ++ sokobanHero (x*40) (y*40) 40
        else if Set.member (x,y) sokobanMap.boxes && Set.member (x,y) sokobanMap.boxTargets then
            sokobanFloor (x*40) (y*40) 40 ++ sokobanBoxTarget (x*40) (y*40) 40 ++ sokobanBox (x*40) (y*40) 40
        else if Set.member (x,y) sokobanMap.boxes then
            sokobanFloor (x*40) (y*40) 40 ++ sokobanBox (x*40) (y*40) 40
        else if Set.member (x,y) sokobanMap.boxTargets then
            sokobanFloor (x*40) (y*40) 40 ++ sokobanBoxTarget (x*40) (y*40) 40
        else
            case mapElement of
                Sokoban.Floor -> sokobanFloor (x*40) (y*40) 40
                Sokoban.Wall -> sokobanWall (x*40) (y*40) 40
                Sokoban.Void -> []
    ) sokobanMap.wallsAndFloors
    |> Array2D.concat
    |> Array.toList
    |> List.concat

sokobanHero : Int -> Int -> Int -> List (Svg Msg)
sokobanHero x y width =
    let
        radius = (width - 16) // 2
    in
        [ circle 
            [ cx <| String.fromInt (x+(width//2))
            , cy <| String.fromInt (y+(width//2))
            , r <| String.fromInt radius
            , fill "#dc143c" ] 
            [] 
        ]

sokobanBoxTarget : Int -> Int -> Int -> List (Svg Msg)
sokobanBoxTarget x y width =
    let
        boxWidth = width - 8
    in
        [ svgSquare (x+4) (y+4) boxWidth "#6495ed" "#000080" ]

sokobanBox : Int -> Int -> Int -> List (Svg Msg)
sokobanBox x y width =
    let
        boxWidth = width - 16
        w = boxWidth // 4
    in
        [ svgRect (x+8) (y+8) w boxWidth "#664c28" "black" ""
        , svgRect (x+8+1*w) (y+8) w boxWidth "#664c28" "black" ""
        , svgRect (x+8+2*w) (y+8) w boxWidth "#664c28" "black" ""
        , svgRect (x+8+3*w) (y+8) w boxWidth "#664c28" "black" ""
        , svgRect (x+8) (y+8) boxWidth w "#664c28" "black" ""
        , svgRect (x+8) (y+8+3*w) boxWidth w "#664c28" "black" ""
        ]
        
        
sokobanWall : Int -> Int -> Int -> List (Svg Msg)
sokobanWall x y width =
    [ svgSquare x y width "#7a3300" "#612800"
    , svgSquare (x+2) (y+2) (width-4) "#943e00" "#522200"
    ]

sokobanFloor : Int -> Int -> Int -> List (Svg Msg)
sokobanFloor x y width =
    [ svgSquare x y width "#ffe4c4" "#f5deb3"
    , svgSquare (x+2) (y+2) (width-4) "#faebd7" "#d2b48c"
    ]

svgSquare : Int -> Int -> Int -> String -> String -> Svg Msg
svgSquare x_ y_ width_ fill_ stroke_ =
    svgRect x_ y_ width_ width_ fill_ stroke_ ""

svgRect : Int -> Int -> Int -> Int -> String -> String -> String -> Svg Msg
svgRect x_ y_ width_ height_ fill_ stroke_ fillOpacity_ =
    rect [ x (String.fromInt x_)
         , y (String.fromInt y_)
         , width (String.fromInt width_)
         , height (String.fromInt height_)
         , fill fill_
         , stroke stroke_
         , fillOpacity fillOpacity_
         ] []

main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }

subscriptions : Model -> Sub Msg
subscriptions model =
    case model of
        Play _ _ game -> 
            case game.gameState of 
                Sokoban.Running -> Browser.Events.onKeyDown keyDecoder
                _ -> Sub.none
        _ -> Sub.none

-- Key decoder
keyDecoder : Decode.Decoder Msg
keyDecoder =
  Decode.field "key" Decode.string
  |> Decode.andThen toDirection

toDirection : String -> Decode.Decoder Msg
toDirection string =
  case string of
    "ArrowLeft" ->
        Decode.succeed <| MoveHero Sokoban.Left

    "ArrowRight" ->
        Decode.succeed <| MoveHero Sokoban.Right
      
    "ArrowUp" ->
        Decode.succeed <| MoveHero Sokoban.Up
        
    "ArrowDown" ->
        Decode.succeed <| MoveHero Sokoban.Down

    _ ->
      Decode.fail ("not supported key: " ++ string)
