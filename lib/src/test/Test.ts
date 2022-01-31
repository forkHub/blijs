namespace ha {
    class Test {
        test() {
            let seg: TestSegment = new TestSegment();
            seg.collide1();
        }

        assert(b: boolean, msg: string = '') {
            try {
                if (!b) {
                    throw new Error(msg);
                }
            }
            catch (e) {
                console.error(e);
            }
        }
    }

    export var test: Test = new Test();
    test.test();
}