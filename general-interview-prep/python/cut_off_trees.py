'''
https://leetcode.com/problems/cut-off-trees-for-golf-event/
'''

class Solution:
    def cutOffTree(self, f):
        s = [(i,j) for i in range(len(f)) for j in range(len(f[0])) if f[i][j]]                
        s.sort(key = lambda x: f[x[0]][x[1]])
        s = [(0,0)] + s
        cumul = 0
        for u,v in zip(s,s[1:]): 
            cumul += self.bfs(u,v,f)
            if cumul == float('inf'): return -1
        return cumul
    
    def bfs(self,source,target,grid):
        q,vis = collections.deque([(source,0)]),set([source])
        while(q):
            u,steps  = q.popleft()
            if u == target: return steps
            for v in [(u[0]-1,u[1]), (u[0]+1,u[1]), (u[0],u[1]-1), (u[0],u[1]+1)]:
                if 0 <= v[0] < len(grid) and 0 <= v[1] < len(grid[0]) and grid[v[0]][v[1]] != 0 and v not in vis:
                    vis.add(v)
                    q.append((v,steps + 1))
        return +float('inf')