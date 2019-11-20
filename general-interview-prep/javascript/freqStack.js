class FreqStack {
    constructor() {
        this.items = [];
        this.seen = {};
        this.size = 0;
        this.mostFreq = -1;
    }

    push(x) {
        this.items.push(x);
        this.size++;
        if (this.seen[x] === undefined) {
            this.seen[x] = [this.size - 1, 1];
        } else {
            this.seen[x][1]++;
        }

        if (this.mostFreq === -1) {
            this.mostFreq = 0;
        }

        if (this.seen[x][1] >= this.seen[this.items[this.mostFreq]][1]) {
            this.mostFreq = this.size - 1;
        }
    }

    pop() {
        let popped = this.items.splice(this.mostFreq, 1);
        this.size--;
        this.mostFreq = 0;
        this.seen[popped][1]--;
        for (let i = 0; i < this.size; i++) {
            if (this.seen[this.items[i]][1] >= this.seen[this.items[this.mostFreq]][1]) {
                this.mostFreq = i;
            }
        }

        return popped;
    }
}

/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 */
