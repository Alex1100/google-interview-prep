class Solution:
    def generateSentences(self, synonyms: List[List[str]], text: str) -> List[str]:
        def find(u):
            if u not in parents:
                parents[u] = u

            while u != parents[u]:
                parents[u] = parents[parents[u]]
                u = parents[u]
                
            return u

        parents = {}
        for u, v in synonyms:
            pu, pv = find(u), find(v)
            if pu != pv:
                parents[pv] = pu
        
        parent_to_childrens = {}
        for p in parents:
            if p not in parent_to_childrens:
                parent_to_childrens[p] = []
                
            parent_to_childrens[find(p)].append(p)
        
        sentences = [""]
        for word in text.split(" "):
            parent = find(word)
            
            if parent not in parent_to_childrens:
                parent_to_childrens[parent] = [parent]
            
            next_versions = []
            for sentence in sentences:
                for w in parent_to_childrens[parent]:
                    next_versions.append(sentence + " " + w if len(sentence) > 0 else w)

            sentences = next_versions
        
        sentences.sort()
        return sentences