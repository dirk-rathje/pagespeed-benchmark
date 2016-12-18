module.exports = function (grunt, options) {

    return {

        options: {
            awsProfile: 'kfb-s3',
            region: 'eu-central-1',
            uploadConcurrency: 5,
            downloadConcurrency: 5,
            params: {
                CacheControl: 'max-age=60'
            }
        },
        put_dev: {
            options: {
                bucket: 'pagespeed-benchmark.4pi.eu',
                differential: true, // Only uploads the files that have changed
            },
            files: [

                {
                    expand: true,
                    cwd: '<%= config.paths.build.dev_htdocs %>',
                    src: ['**'],
                    dest: '',
                    params: {
                        CacheControl: 'private'
                    }
                }
            ]
        },

        clean_dev: {
            options: {
                bucket: 'pagespeed-benchmark.4pi.eu',
                debug: false // if true: doesn't actually delete but shows log
            },
            files: [{
                    dest: '/',
                    action: 'delete'
                }

            ]
        }

    }
}