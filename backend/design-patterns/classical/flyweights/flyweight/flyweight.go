package flyweight

import (
  "time"
)

/*
 * FlyWeight Pattern
 *
 * Commonly used in computer graphics and
 * video gaming industry
 *
 * Allows sharing the state of a heavy object
 * between many instance of some type
 *
 * Provides additional help of the Factory pattern
 *
 *
 * Typicall we use it to:
 *
 * Share all possible states of objects in
 * a single common object
 *
 * Minimize object creation by using pointers
 * to already created objects
 *
 *
 * Flyweight:
 * Same type is not created only once
 * like with Singletons
 *
 * It's a Structural Pattern vs a Creational in Singletons
 *
 *
 *
 */


const (
  TEAM_A = iota
  TEAM_B = 2
)

type Player struct {
  Name string
  Surname string
  PreviousTeam uint64
  Photo []byte
}

type HistoricalData struct {
  Year uint8
  LeagueResults []Match
}

type Team struct {
  ID uint64
  Name string
  Shield []byte
  Players []Player
  HistoricalData []HistoricalData
}


type Match struct {
  Date time.Time
  VisitorId uint64
  LocalId uint64
  LocalScore byte
  VisitorScore byte
  LocalShots uint16
  VisitorShots uint16
}

type TeamFlyweightFactory struct {
  createdTeams map[int]*Team
}

func (t *TeamFlyweightFactory) GetTeam(teamName int) *Team {
  if t.createdTeams[teamName] != nil {
    return t.createdTeams[teamName]
  }
  team := GetTeamFactory(teamName)
  t.createdTeams[teamName] = team
  return t.createdTeams[teamName]
}

func GetTeamFactory(teamName int) *Team {
  switch teamName {
    case TEAM_B:
      return &Team{
        ID: 2,
        Name: "TEAM_B",
      }
    default:
      return &Team{
        ID: 1,
        Name: "TEAM_A",
      }
  }
}

func NewTeamFactory() TeamFlyweightFactory {
  return TeamFlyweightFactory{
    createdTeams: make(map[int]*Team, 0),
  }
}

func (t *TeamFlyweightFactory) GetNumberOfObjects() int {
  return len(t.createdTeams)
}
