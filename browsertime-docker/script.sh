#!/bin/sh

names='0-starting-point.html 1-gzip.html 2-image-optimization.html 3-asset-minification.html 4-icon-inlining.html 5-asset-bundling.html final.html'
domains='https://pagespeed-benchmark-http-1.4pi.eu/best-practices/ https://pagespeed-benchmark.4pi.eu/best-practices/'
connections='3g 3gfast cable'
for connection in $connections
  do
    dir='/Users/dirk/Projekte/J.Err.Obs/pagespeed-benchmark/browsertime-results/'$connection
    cd $dir
    
    for domain in $domains
      do
        for name in  $names
          do
            url=$domain$name
            echo "cd $dir"
            echo "$url"
            docker run --privileged --shm-size=1g --rm -v "$(pwd)":/browsertime-results sitespeedio/browsertime -n 1 --speedIndex --viewPort 1024x800  -c $connection $url
          done
      done
  done
cd /Users/dirk/Projekte/J.Err.Obs/pagespeed-benchmark/


