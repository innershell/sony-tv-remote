# Sony TV Web Page (PWA) Remote Control
![Sony TV Remote Screenshot](/images/sony-tv-remote-screen.png)

## Web-based Sony Remote Control
This is a Sony TV remote control running entirely on a web page and a Progressive Web Application (PWA). As such, this application can be used online, installed locally, or installed as a web extension. I wrote this application because my wife is the master of the TV controller, so I needed a second controller for the occasional evil games I could play fighting over a TV program.

Only Sony Bravia TVs are capable of using this web page because they include APIs for use by home automation specialists to connect with their home automation systems.

## How it works
Sony Bravia TVs (2016 or later, some earlier ones too) support IRCC control (infrared-like-control-commands). These can be sent to the TV over HTTP using a POST request. This request is also secured with a Pre-Shared key (PSK) that must be provided in the POST request header. Cross-Origin Resource Sharing (CORS) headers are also correctly handled in the JavaScript.
