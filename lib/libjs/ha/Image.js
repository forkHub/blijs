var ha;
(function (ha) {
    var blitz;
    (function (blitz) {
        class Image {
            loadImage = async (url) => {
                return new Promise((resolve, reject) => {
                    let image2 = document.createElement('img');
                    image2.onload = () => {
                        resolve(image2);
                    };
                    image2.src = url;
                    image2.onerror = (e) => {
                        reject(e);
                    };
                });
            };
        }
        blitz.image = new Image();
    })(blitz = ha.blitz || (ha.blitz = {}));
})(ha || (ha = {}));
