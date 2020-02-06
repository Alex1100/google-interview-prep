type Vertex struct {
    Val int
    Edges map[int]*Vertex
}

type Graph struct {
    Vertexes map[int]*Vertex
    VertexList []int
}


func ConstructGraph(courses []int) *Graph {
    vertexes := map[int]*Vertex{}
    for i := range courses {
        vertexes[courses[i]] = &Vertex{
            Val: courses[i],
            Edges: map[int]*Vertex{},
        }
    }

    g := &Graph{
        Vertexes: vertexes,
        VertexList: courses,
    }

    return g;
}

func (g *Graph) HasVertex(v int) bool {
    for i := range g.VertexList {
        if g.VertexList[i] == v {
            return true
        }
    }

    return false
}

func (g *Graph) AddEdge(from, to int) {
    if g.HasVertex(from) && g.HasVertex(to) {
        g.Vertexes[from].Edges[to] = g.Vertexes[to]
    }
}

func contains(stack []int, target int) bool {
    if len(stack) == 0 {
        return false
    }

    for i := range stack {
        if stack[i] == target {
            return true
        }
    }

    return false
}

func (g *Graph) hasCycleUtil(start int, visited map[int]bool, stack []int) bool {
    if visited[start] == false {
        visited[start] = true
        stack = append(stack, start)

        edges := g.Vertexes[start].Edges

        for edge, _ := range edges {
            if visited[edge] == false && g.hasCycleUtil(edge, visited, stack) {
                return true
            } else if contains(stack, edge) {
                return true
            }
        }
    }

    stack = stack[:len(stack) - 1]
    return false
}

func (g *Graph) HasCycle() bool {
    for i := range g.VertexList {
        visited := map[int]bool{}
        stack := []int{}
        if g.hasCycleUtil(g.VertexList[i], visited, stack) {
            return true
        }
    }

    return false
}


func canFinish(numCourses int, prerequisites [][]int) bool {
    if numCourses < 2 {
        return true
    }

    if len(prerequisites) == 0 {
        return true
    }

    seenCoursesInitial := make(map[int]int)

    for i := 0; i < len(prerequisites); i++ {
        x, y := prerequisites[i][0], prerequisites[i][1]
        seenCoursesInitial[x] = x
        seenCoursesInitial[y] = y
    }

    courses := []int{}
    for _, val := range seenCoursesInitial {
        courses = append(courses, val)
    }

    courseGraph := ConstructGraph(courses)

    for i := range prerequisites {
        x, y := prerequisites[i][0], prerequisites[i][1]
        courseGraph.AddEdge(x, y)
    }


    // now do a detect cycle on the graph
    if courseGraph.HasCycle() {
        return false
    }

    return true
