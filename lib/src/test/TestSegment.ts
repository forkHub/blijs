namespace ha {
    export class TestSegment {
        collide1(): void {

            //horizontal
            //noll
            let seg1: ISegment = ha.segment.createSeg(ha.point.create(0, 10), ha.point.create(10, 10));
            let seg2: ISegment = ha.segment.createSeg(ha.point.create(0, 0), ha.point.create(10, 0));
            ha.test.assert(ha.segment.collide(seg1, seg2) == false);

        }

    }
}