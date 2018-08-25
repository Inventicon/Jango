# Jango
_"I'll take that off your hands."_

### Setup
1) `git clone https://github.com/Inventicon/Jango ./<YOUR_APP_NAME>`
2) Change `name` value inside package.json
3) Run `npm install`


### Development
- Run `npm start` or `npm run dev` to test the program locally
- Pass arguments to your program using the getopt double-dash options delimiter (`npm start -- --arg=value`)


### Compiling for Production
1) Run `npm run deploy`
2) Program is compiled and placed in `dist/bin/<YOUR_APP_NAME>(.exe if on Windows)`