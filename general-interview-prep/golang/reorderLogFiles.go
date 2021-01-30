import (
	"regexp"
	"strings"
)

func reorderLogFiles(logs []string) []string {
	alphaTest := regexp.MustCompile("[A-Za-z]")
	alphaLogs := make([]string, 0)
	digiLogs := make([]string, 0)
	answer := make([]string, 0)

	for _, log := range logs {
			strLog := string(log)
			splitLog := strings.Join(strings.Split(strLog, " ")[1:], "")
			found := alphaTest.FindAllString(splitLog, -1)
			
			if len(found) > 0 {
					alphaLogs = append(alphaLogs, strLog)
			} else {
					digiLogs = append(digiLogs, strLog)
			}
	}
	
	sort.Slice(alphaLogs, func (i, j int) bool {
			iIndex := strings.Index(alphaLogs[i], " ")
			jIndex := strings.Index(alphaLogs[j], " ")
			
			iLog := alphaLogs[i][iIndex+1:]
			jLog := alphaLogs[j][jIndex+1:]
			if iLog == jLog {
					return alphaLogs[i] < alphaLogs[j]
			}
			return iLog < jLog
	})
	
	
	answer = append(answer, alphaLogs...)
	answer = append(answer, digiLogs...)
	
	return answer
}