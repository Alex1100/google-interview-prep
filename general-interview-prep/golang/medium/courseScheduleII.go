// https://leetcode.com/problems/course-schedule-ii/

// PROMPT:

// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
// You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must 
// take course bi first if you want to take course ai.

// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// Return the ordering of courses you should take to finish all courses. 
// If there are many valid answers, return any of them. 
// If it is impossible to finish all courses, return an empty array.



// type Vertex struct {
//     Val int
//     Edges map[int]*Vertex
// }

// type Graph struct {
//     Vertexes map[int]*Vertex
//     VertexList []int
// }

// func ConstructGraph(courses []int) *Graph {
//     vertexes := map[int]*Vertex{}
//     for i := range courses {
//         vertexes[courses[i]] = &Vertex{
//             Val: courses[i],
//             Edges: map[int]*Vertex{},
//         }
//     }

//     g := &Graph{
//         Vertexes: vertexes,
//         VertexList: courses,
//     }

//     return g
// }

// func (g *Graph) HasVertex(v int) bool {
//     return g.Vertexes[v] != nil
// }

// func (g *Graph) AddEdge(from, to int) {
//     if g.HasVertex(from) && g.HasVertex(to) {
//         g.Vertexes[from].Edges[to] = g.Vertexes[to]
//     }
// }

// func (g *Graph) dfsUtil(start int, visited map[int]bool, stack []int) []int {
//     if len(stack) == len(g.VertexList) {
//         return stack
//     }

//     if visited[start] == false {
//         fmt.Println("SHOULD LAND HERE: ", start)
//         visited[start] = true
//         stack = append(stack, start)
//     }

//     edges := g.Vertexes[start].Edges

//     for _, edge := range edges {
//         if visited[edge.Val] == false {
//             stack = g.dfsUtil(edge.Val, visited, stack)
//         }
//     }

//     return stack
// }

// func (g *Graph) DFS() []int {
//     visited := map[int]bool{}
//     stack := []int{}
//     start := g.VertexList[1]
//     stack = g.dfsUtil(start, visited, stack)

//     return stack
// }



// func findOrder(numCourses int, prerequisites [][]int) []int {
//     fmt.Println("WHAT: ", numCourses, prerequisites)
//     if len(prerequisites) == 0 || numCourses == 0 {
//         res := make([]int, numCourses)
//         count := 0
//         for numCourses > 1 {
//             res[count] = numCourses - 1
//             numCourses--
//             count++
//         }
//     }

//     seenCoursesInitial := make(map[int]int)

//     for i := 0; i < len(prerequisites); i++ {
//         x, y := prerequisites[i][0], prerequisites[i][1]

//         seenCoursesInitial[x] = x
//         seenCoursesInitial[y] = y
//     }

//     courses := []int{}

//     for _, val := range seenCoursesInitial {
//         courses = append(courses, val)
//     }

//     courseGraph := ConstructGraph(courses)

//     for i := 0; i < len(prerequisites); i++ {
//         x, y := prerequisites[i][0], prerequisites[i][1]
//         courseGraph.AddEdge(y, x)
//     }

//     return courseGraph.DFS()
// }



// Hint 1:
// This problem is equivalent to finding the topological order in a directed graph. If a cycle exists, 
// no topological ordering exists and therefore it will be impossible to take all courses.

// Hint 2:
// Topological Sort via DFS - A great video tutorial (21 minutes) on Coursera explaining the basic concepts of Topological Sort.

// Hint 3:
// Topological sort could also be done via BFS.

func findOrder(numCourses int, prerequisites [][]int) []int {
	if numCourses == 1 {
		return []int{0}
	}

	graph := make(map[int][]int, 0)
	order := make([]int, numCourses)
	for i := 0; i < numCourses; i++ {
		graph[i] = []int{}
		order[i] = 0
	}

	for _, p := range prerequisites {
		graph[p[1]] = append(graph[p[1]], p[0])
		order[p[0]] += 1
	}

	queue := []int{}
	solution := []int{}

    // if the indegree is 0 meaning this course has no
    // prereqs, append to the solution
	for course, numOfPrereqs := range order {
		if numOfPrereqs == 0 {
			queue = append(queue, course)
			solution = append(solution, course)
		}
	}

	for len(queue) > 0 {
		course := queue[0]
		queue = queue[1:]
        // dequeue and enumerate
		for _, edge := range graph[course] {
			order[edge] -= 1
			if order[edge] == 0 {
				queue = append(queue, edge)
				solution = append(solution, edge)
			}
		}
	}

	if len(solution) == 0 {
		return solution
	}

	if len(solution) == numCourses {
		return solution
	} else {
		return []int{}
	}
}