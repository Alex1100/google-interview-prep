package facade

import (
  "bytes"
  "fmt"
  "io"
  "testing"
)

func getMockData() io.Reader {
  response := `{"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}],"base":"stations","main":{"temp":80.32,"pressure":1012,"humidity":81,"temp_min":279.15,"temp_max":281.15},"visibility":10000,"wind":{"speed":4.1,"deg":80},"clouds":{"all":90},"dt":1485789600,"sys":{"type":1,"id":5091,"message":0.0103,"country":"GB","sunrise":1485762037,"sunset":1485794875},"id":2643743,"name":"London","cod":200}`
  r := bytes.NewReader([]byte(response))

  return r
}

func TestOpenWeatherMap_responseParser(t *testing.T) {
  r := getMockData()
  openWeatherMap := CurrentWeatherData{APIkey: MyAPIKey}
  weather, err := openWeatherMap.ResponseParser(r)
  if err != nil {
    t.Fatal(err)
  }

  if weather.ID != 2643743 {
    t.Errorf("London id is 300, not %d\n", weather.ID)
  }
  fmt.Println("Temperature is: ", weather.Main.Temp)
}
