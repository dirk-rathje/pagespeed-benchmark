module.exports = function (grunt, options) {



    let qualities = [50, 30];

    let config = {}

    for (let i = 0; i < 10; i++) {

        qualities.forEach(

            quality => {

                let taskname = "photos-0" + i + "-q" + quality

                let filename = '_build/images/photo-0' + i +
                    "-q" + quality + '.jpg';

                config[taskname] = {
                    options: {
                        engine: "gm",
                        customIn: ['-interlace', 'line'], // produce progressive images
                        customOut: [
                            // draw a copywrite notice in the bottom-right corner
                            // add running number to generate truelly different images

                            '-gravity', 'SouthEast', '-font', 'Arial', '-pointsize', '12',
                            '-fill', '#445', '-draw', 'text 5,2 \'\u00A9 pexels-121734\'',
                            '-fill', '#ffe', '-draw', 'text 6,3 \'\u00A9 pexels-121734\'',
                            '-pointsize', '48',
                            '-gravity', 'SouthWest',
                            '-fill', '#445', '-draw', 'text 5,2 \'' + i + '\'',
                            '-fill', '#ffe', '-draw', 'text 6,3 \'' + i + '\'',
                            '-quality', quality
                        ],
                        aspectRatio: false,
                        newFilesOnly: false,
                        sizes: [{
                            name: "200x133",
                            width: 200,
                            height: 133
                        }, {
                            name: "300x200",
                            width: 300,
                            height: 200
                        }, {
                            name: "600x400",
                            width: 600,
                            height: 400
                        }]
                    },
                    files: {
                    }

                }
                config[taskname].files[filename] = '_source/images/pexels-photo-121734.jpg';
            })

    }

    // console.log(config)

    return config;
}