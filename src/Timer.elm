module Timer exposing (..)

import Time
import Task

type Timer
    = NotStarted
    | Started Time.Posix
    | Finished Time.Posix Time.Posix

create : Timer
create =
  NotStarted

start : Time.Posix -> Timer
start startTime =
  Started startTime

finish : Time.Posix -> Timer -> Timer
finish finishTime eTime =
  case eTime of
    Started startTime -> 
      Finished startTime finishTime
    _ -> 
      eTime

elapsedTime : Timer -> Maybe Time.Posix
elapsedTime eTime =
    case eTime of
      Finished startT finishT -> 
        Just 
          <| Time.millisToPosix 
          <| (Time.posixToMillis finishT) - (Time.posixToMillis startT)
      _ -> 
        Nothing

elapsedTimeString : Timer -> Maybe String
elapsedTimeString eTime =
  case elapsedTime eTime of
    Nothing -> 
      Nothing
    Just time ->
      let 
        hour   = String.fromInt (Time.toHour   Time.utc time)
        minute = String.fromInt (Time.toMinute Time.utc time)
        second = String.fromInt (Time.toSecond Time.utc time)
      in
        Just <| (twoDigit hour) ++ ":" ++ (twoDigit minute) ++ ":" ++ (twoDigit second)

twoDigit : String -> String
twoDigit string =
  if String.length string <= 1 then
    "0" ++ string
  else
    string

type Msg
  = StartTime Time.Posix
  | StopTime Time.Posix
  | Start
  | Stop

update: Msg -> Timer -> (Timer, Cmd Msg)
update msg timer =
  case msg of
   Start ->
      (timer, Task.perform StartTime Time.now)
   Stop ->
     (timer, Task.perform StopTime Time.now)
   StartTime now ->
     (start now, Cmd.none)
   StopTime now ->
     (finish now timer, Cmd.none)