import  express from "express";
import axios from "axios";

const port =3000;
const app = express();
app.use(express.static("public"));
var result2={primaryImage: ""};

//https://collectionapi.metmuseum.org/public/collection/v1/objects
app.get("/", async (req, res) => {
    try {
     do{
        var response = await axios.get("https://collectionapi.metmuseum.org/public/collection/v1/objects");
        var result = response.data;
        var objectid = result.objectIDs[Math.ceil(Math.random()*result.objectIDs.length)];
        console.log(objectid);
        var response2 = await axios.get("https://collectionapi.metmuseum.org/public/collection/v1/objects/"+objectid);
        result2 = response2.data;
     }while (result2.primaryImage="")
          
      res.render("index.ejs", { data: result2 });
      
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
        
      });
    }
  });

  app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
  })

