var ha;
(function (ha) {
    class Line {
        createLine(m, b) {
            return {
                b: b,
                m: m,
                y: 0
            };
        }
        fromPos() {
        }
        fromVec() {
        }
        fromSeg() {
        }
        lineCrossPos(line, line2) {
            line;
            line2;
            return null;
        }
    }
    ha.line = new Line();
})(ha || (ha = {}));
