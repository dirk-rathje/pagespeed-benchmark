# pagespeed-benchmark
Compares the impact of best practices for boosting webpage speed


# Abstract


Crucial for any good user experience is the perceived time it takes to load a web page. One of the most prominent advocates for a speedy web is Google (and argueably not only to sell more ads). Google has brought us HTTPS/2 (resp. the SPDY protocol which HTTPS/2 is based on), they invented _Accelerated Mobile Pages_ for instant web pages, and provides PageSpeed Tools and Insights with many useful information on improving web page speeds.

While there are quite a few best practices for improving the page speed, I wanted to know how to rate their impact each. 


# The need for speed



<table>

   <tbody>
    <tr>
        <td>user perceives response as instantaneous</td><td>< 100 ms</td>
    </tr>
    <tr>
        <td>user’s flow of thought gets interrupted</td><td>> 1.000 ms</td>
    </tr>
    <tr>
        <td>user’s attention wanders off completey</td><td>> 10.000 ms</td>
    </tr>
   <caption>Nielsen, J. (2000). Designing Web Usability. New Riders Pub.</caption>
   </tbody>
</table>

 




## Mainframe response times


As early as 1968, when neither personal computers, the web, nor smartphones existed yet, IBM psychologist Robert Miller did pioneering work on the question of how fast computers are to respond to human queries. In his seminal paper 'Response time in man-computer conversational transactions', Miller established a response time threshold of **two seconds**. All response delays more than two seconds are likely to disturb the user's flow of thought. 

Theoretically, Miller based his empirical findings on the psychological concept of closure. 

> [...] humans spontaneously organize their activities into clumps that are terminated by the completion of a subjective purpose or subpurpose. When I search in a phone book for a telephone number with which to dial a person I want to talk with, I have a sense of temporary completion when I find the telephone number. I have another when I have completed dialing the number. I will more readily tolerate an interruption or delay after such a completion than during the activities preceding this completion. Psychologists call this subjective sense of completion a "closure" [...]  
> Miller, R. B. (1968). Response time in man-computer conversational transactions. AFIPS Fall Joint Computing Conference, 267–277. http://doi.org/10.1145/1476589.1476628,  p. 268

> A general rule for guidance would be: For good communication with humans, response delays of more than two seconds should follow only a condition of task closure as perceived by the human, or as structured for the human.  
> (Miller, R. B. (1968). Response time in man-computer conversational transactions. AFIPS Fall Joint Computing Conference, 267–277. http://doi.org/10.1145/1476589.1476628)

## Nielsen's three thresholds

Among the merits of usability expert Jacob Nielsen, author of more than twelve books on usability and editor of the [Alertbox newsletter](https://www.nngroup.com/articles/), is popularising Miller's thresholds. 


> * One tenth of a second (0.1) is about the limit for having the user feel that the system is reacting instantaneously, meaning that no special feedback is necessary except to display the result. This would be the response time limit for any applets that allow users to move, zoom, or otherwise manipulate screen elements in real time.
> * One second (1.0) is about the limit for the user’s flow of thought to remain uninterrupted, even though the user will notice the delay. Normally, no special feedback is necessary during delays of more than 0.1 but less than 1.0 second, but the user does lose the feeling of operating directly on the data. Getting a new page within a second means that the user arrived at the page without undue delay.
> * Ten seconds (10.0) is about the limit for keeping the user’s attention focused on the dialogue. For longer delays, users turn to other tasks while waiting for the computer to finish. Getting a new page within 10 seconds, while annoying, at least means that the user can stay focused on navigating the site.  
> (Nielsen, J. (2000). Designing Web Usability. New Riders Pub.)





# How speed can be measured

There are different performance indicators linked to how page loading speeds are assessed by users. 

The **document load time** is the time a browsery needs to load a html resource. Since a typical html page comprises links to external style, script and image files, the **page load time** is the time after all of these files have been loaded and processed. Obviously, the document load time is shorter or equal the page load time. 

But since modern browsers are clever beasts, they can render parts of a page without having loaded all linked files. Here, the page area above the fold (i. e. the upper part of the page shown without using the scrollbar) are of special importance. This time is known as render time of the critical rendering path. Here, I will refer to it as **viewport render time**. 

More indirect indicators are the **number and sizes of all the resources** belonging to a html request.  


https://www.w3.org/TR/navigation-timing/

https://developers.google.com/web/fundamentals/performance/critical-rendering-path/



# How fast can you get?



<table>

   <tbody>
    <tr>
        <td>light speed (vaccuum)</td><td>~0.4 ms</td>
    </tr>
    <tr>
        <td>light speed (optical fibre)</td><td>~0.6 ms</td>
    </tr>
    <tr>
        <td>ping time</td><td>~30 ms</td>
    </tr>
    <tr>
        <td>HTTP roundtrip</td><td>~60 ms</td>
    </tr>
    <tr>
        <td>HTTPS roundtrip</td><td>~150 ms</td>
    </tr>
   <caption>round trip (Hamburg - Frankfurt/M - Hamburg)</caption>
   </tbody>
</table>


## rondtrip: HH - FFM - HH

* light speed :  2 × 500 KM × 3.33 µs / km = 0.4 ms
* ping time: (Google: 8 ms, AWS Cloudfront: < 20 ms, Hetzner: 32 ms
* single HTTP roundtrip: ~60 ms
* single HTTPS roundtrip: ~ 150 ms




# How speed can be optimized



## Fast server-side response rendering

This article does NOT tackle the challenge of improving serverside render times, we look at serving static files only.

## Starting Point

## Reducing file sizes

### Compressing

### Image optimization

### JS/CSS minification

## Reducing number of requests

### Icon inlining

### JS/CSS bundling


## Critical Render Path

### Script deferring/asyncing






## HTTPS/2 


## Optimizing the critical rendering path

https://www.youtube.com/watch?v=YV1nKLWoARQ


https://developers.google.com/web/fundamentals/performance/critical-rendering-path/



# The test setup


The page comprises webfonts, text, SVG icons, images and a D3.js visualization.  


## Parameters

* text-length

* number of images per file size



