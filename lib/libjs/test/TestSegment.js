var ha;
(function (ha) {
    class TestSegment {
        collide1() {
            let seg1 = ha.segment.createSeg(ha.point.create(0, 10), ha.point.create(10, 10));
            let seg2 = ha.segment.createSeg(ha.point.create(0, 0), ha.point.create(10, 0));
            ha.test.assert(ha.segment.collide(seg1, seg2) == false);
        }
    }
    ha.TestSegment = TestSegment;
})(ha || (ha = {}));
