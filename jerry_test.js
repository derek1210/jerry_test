  // Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)

/**
 * 
 * NOTE: Feel free to add any extra member variables/functions you like.
 */

class RangeList {
  /**
   * Adds a range to the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  constructor() {
    this.rangeList = {};
  }


  add(range) {
    // TODO: implement this
    const keys = Object.keys(this.rangeList);
    const [start, end] = range;
    if (start >= end) {
        return ;
    } else if (!keys.length) {
        this.rangeList[start] = end;
    } else {
        // if start in range (key <= start <= value) ==> if end > value ==> change value = end
        // if start > value  ==> skip 
        // if end of rangeList ==> add range
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            const value = this.rangeList[key];
            if (start >= key && start <= value) {
                if (end > value) {
                    this.rangeList[key] = end;
                    return ;
                } else {
                    return ;
                }
            } else {
                if (index == keys.length - 1) {
                    this.rangeList[start] = end;
                }
            }
        }
    }
  }

  /**
   * Removes a range from the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range) {
    // TODO: implement this

    const keys = Object.keys(this.rangeList);
    let [start, end] = range;
    if (!keys.length) {
        return ;
    } else if (start >= end) {
        return ;
    } else if (this.rangeList.hasOwnProperty(start)) {
        const value = this.rangeList[start];
        if (value <= end) { // rangeList: [[1,5)] range: [1,5) || rangeList: [1,5) range: [1,6)
            delete this.rangeList[start];
            this.remove([value, end]);
            return ;
        } else {
            if (value > end) {
                this.rangeList[end] = value; //rangeList: [1,5)] range: [1,2) ==> [2,5]
                delete this.rangeList[start];
                return ;
            }
        }
    } else {
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            const value = this.rangeList[key];
            if (key < start && start < value) { // if start in range
                if (end == value) { //rangeList: [1,5) range: [4,5) ==> [1,4)
                    this.rangeList[key] = start;
                    return ;
                } else if (end < value) { // rangeList: [1,5) range: [2,3) ==> [1, 2) [3, 5)
                    this.rangeList[key] = start;
                    this.rangeList[end] = value; 
                    return ;
                } else {
                    this.remove([start, value]);
                    this.remove([value, end]);
                    return ;
                }
            } else {
                if (index == keys.length - 1) { 
                    start += 1
                    this.remove([start, end]);
                    return ;
                }
            }
        }
    }
  }

  /**
   * Prints out the list of ranges in the range list
   */
  print() {
    // TODO: implement this
    let output = "";
    for (let key in this.rangeList) {
        output = output + `[${key}, ${this.rangeList[key]}) `;
    }
    console.log(output);
  }
}


// Example run
const rl = new RangeList();

rl.add([1, 5]);
rl.print();
// Should display: [1, 5)

rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)

rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)

rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)

rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)

rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)

rl.remove([10, 10]);
rl.print();
// Should display: [1, 8) [10, 21)

rl.remove([10, 11]);
rl.print();
// Should display: [1, 8) [11, 21)

rl.remove([15, 17]);
rl.print();
// Should display: [1, 8) [11, 15) [17, 21)

rl.remove([3, 19]);
rl.print();
// Should display: [1, 3) [19, 21)