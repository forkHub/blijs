var ha;
(function (ha) {
    class Test {
        test() {
            let seg = new ha.TestSegment();
            seg.collide1();
        }
        assert(b, msg = '') {
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
    ha.test = new Test();
    ha.test.test();
})(ha || (ha = {}));
