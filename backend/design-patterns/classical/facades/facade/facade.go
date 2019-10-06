package facade

import (
  "io"
  "io/ioutil"
  "encoding/json"
  "fmt"
  "net/http"
)

/*
 * Facade Pattern
 *
 * A Facade in Architectural terms is
 * the front wall that hides the rooms
 * and corridors of a building
 *
 * In Code:
 * The Facade Pattern Hides the complexity of some tasks
 * A library is a form of a facade
 * If you need to use your library, you don't
 * need to know all the inner tasks
 *
 * It shields the code from unwanted access,
 * orders some calls, and hides the complexity
 * scope from the user
 *
 *
 * It is used when:
 *
 * When we need to decrease the complexity of some
 * parts of the code
 *
 * When we need to group actions that are
 * cross-related in a single place
 *
 * When we need to build a library so
 * others can use the product(s)
 *
 *
 * Examples:
 * Library that accesses OpenWeatherMaps service
 *
 *
 *
 */

 var MyAPIKey string = "1b643dd88417dd56cf7701c937df4b75"

 type CurrentWeatherDataRetriever interface {
   GetByCityAndCountryCode(city, countryCode string) (Weather, error)
   GetByGeoCoordinates(lat, lon float32) (Weather, error)
 }

type CurrentWeatherData struct {
  APIkey string
}

type Weather struct {
  ID int `json:"id"`
  Name string `json:"name"`
  Cod int `json:"cod"`
  Coord struct {
    Lon float32 `json:"lon"`
    Lat float32 `json:"lat"`
  } `json:"coord"`
  Weather []struct {
    ID int `json:"id"`
    Main string `json:"main"`
    Description string `json:"description"`
    Icon string `json:"icon"`
  } `json:"weather"`
  Base string `json:"base"`
  Main struct {
    Temp float32 `json:"temp"`
    Pressure float32 `json:"pressure"`
    Humidity float32 `json:"humidity"`
    TempMin float32 `json:"temp_min"`
    TempMax float32 `json:"temp_max"`
  } `json:"main"`
  Wind struct {
    Speed float32 `json:"speed"`
    Deg float32 `json:"deg"`
  } `json:"wind"`
  Clouds struct {
    All int `json:"all"`
  } `json:"clouds"`
  Rain struct {
    ThreeHours float32 `json:"3h"`
  } `json:"rain"`
  Dt uint32 `json:"dt"`
  Sys struct {
    Type int `json:"type"`
    ID int `json:"id"`
    Message float32 `json:"message"`
    Country string `json:"country"`
    Sunrise int `json:"sunrise"`
    Sunset int `json:"sunset"`
  } `json:"sys"`
}

func (c *CurrentWeatherData) ResponseParser(body io.Reader) (*Weather, error) {
  w := new(Weather)
  err := json.NewDecoder(body).Decode(w)
  if err != nil {
    return nil, err
  }

  return w, nil
}

func (c *CurrentWeatherData) GetByCityAndCountryCode(city, countryCode string) (weather *Weather, err error) {
  return c.doRequest(
    fmt.Sprintf("http://api.openweathermap.org/data/2.5/weather?q=%s,%s&APPID=%s", city, countryCode, c.APIkey),
  )
}

func (c *CurrentWeatherData) GetByGeoCoordinates(lat, lon float32) (weather *Weather, err error) {
  return c.doRequest(
    fmt.Sprintf("http://api.openweathermap.org/data/2.5/weather?lat=%f&lon=%f&APPID=%s", lat, lon, c.APIkey),
  )
}

func (c *CurrentWeatherData) doRequest(uri string) (weather *Weather, err error) {
  client := &http.Client{}
  req, err := http.NewRequest("GET", uri, nil)
  if err != nil {
    return nil, err
  }

  req.Header.Set("Content-Type", "application/json")
  resp, err := client.Do(req)
  defer resp.Body.Close()

  if err != nil {
    return nil, err
  }

  if resp.StatusCode != 200 {
    byt, errMsg := ioutil.ReadAll(resp.Body)
    if errMsg == nil {
      errMsg = fmt.Errorf("%s", string(byt))
    }

    err = fmt.Errorf("Status code was %d, aborting. Error message was:\n%s\n", resp.StatusCode, errMsg)
    return nil, err
  }

  weather, err = c.ResponseParser(resp.Body)
  return weather, nil
}
