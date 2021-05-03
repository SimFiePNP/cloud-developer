import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT

  app.get('/filteredimage', async (req, res) => {
    var image_url = req.query['image_url']
    if (image_url == undefined) {
      res.status(406)
      res.send("No URL was found")
    } else {
      const outputPath = await filterImageFromURL(image_url);
      res.sendFile(outputPath, async (error) => {
        await deleteLocalFiles([outputPath])
        if (!error) {
          res.status(200);
        }
        res.status(500);
      })
    }
  })

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
