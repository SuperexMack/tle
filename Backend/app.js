const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const PORT = 5000

app.get("/api/codechef", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.codechef.com/api/list/contests/future?sort_by=START&sorting_order=desc&offset=0&mode=all"
    );
    const secondResponse  = await axios.get("https://www.codechef.com/api/list/contests/past?sort_by=START&sorting_order=desc&offset=0&mode=all")

    return res.json({firstData:response.data,secondData:secondResponse.data});
  } 
  catch (error) {
    res.status(500).json({ error: "Error fetching CodeChef data" });
  }
});


app.get("/api/codeforces",async(req,res)=>{
  try{
    const response = await axios.get("https://codeforces.com/api/contest.list")
    return res.json(response.data)
  }
  catch(error){
    res.json({msg:"Something went wrong while fetching the CodeForces data " + error})
  }
})

app.listen(PORT,()=>{
    console.log(`Server is running on the port number ${PORT}`)
})