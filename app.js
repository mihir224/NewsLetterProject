const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');
const https=require('https'); 
const client=require('@mailchimp/mailchimp_marketing');
const app=express();
client.setConfig({
    apiKey:"fa47433d739c7bdc76a366785eeacff9-us9",
    server:"us9",
});
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;
    const run = async () => {
        const response = await client.lists.addListMember("b78d173b62", {
          email_address: email,
          status: "subscribed",
          merge_fields: {
              FNAME: firstName,
              LNAME: lastName
          }
        });
        console.log(response); // (optional) 
      };
      run();
      if(res.statusCode===200){
          res.sendFile(__dirname+"/success.html");
      }
      else{
          res.sendFile(__dirname+"/failure.html");
      }
});
    app.post("/failure.html",function(req,res){
        res.redirect("/");
    })
app.listen(process.env.PORT ,function(){
    console.log("Server started on port 3000");
});




// fa47433d739c7bdc76a366785eeacff9-us9

// b78d173b62