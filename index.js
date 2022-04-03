let express = require("express");
var request = require('request');
var util = require('util');
const youtubedl = require('youtube-dl')
let port = 4000;
let app = express();
app.use(
    express.urlencoded({
        extended: false
    })
);
app.get("/", async (req,res) => {
    let q = req.query.query;
    await download(q,res);
})
app.use(express.json());
app.listen(port);

async function download(q,res){
    var options = {
        method: 'GET',
        url : 'https://api.twitter.com/2/tweets/search/recent',
        headers: {
          'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAMd3WwEAAAAA9W%2FbQvsnxlRFDivYSOwHsXiMmiI%3DuR4FRMjLH9uOGuvi4S9ccXBRg3ud0s88TerwhAKHA5sqzkolAu'
        },
        qs : {
          query : q
        } 
      };
      let req = util.promisify(request);
      let response = await req(options);
      let body = JSON.parse(response.body);   
      let data = body.data;
      let counter = 0;
      download(data,counter,res)
}

function download(data,counter,res){
  let item = data[counter];
  let text = item.text;
  var matches = text.match(/\bhttps?:\/\/\S+/gi);
  if(matches){
    let href = matches[0];
    const video = youtubedl(href);
    let videoname = item.id + ".mp4"
    video.pipe(fs.createWriteStream(videoname));
    video.on("error", (err) => {
      download(data,counter,res)
    })
    video.on("complete", function complete(info) {
      let url = "https://hekayaent.co.ke/media/"+videoname;
      res.send({url : url , text : text });
    })
  }
  else{
    download(data,counter++,res)
  }
}