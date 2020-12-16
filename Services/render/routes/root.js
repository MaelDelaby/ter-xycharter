const express = require('express');
const axios = require('axios').default;
const renderRouter = express.Router();
const { param, query, validationResult } = require('express-validator');

//Redirect the request to the XYCharterRenderer or the QuickchartRenderer
renderRouter.get('/graphs/:id', [query('type').matches(
   "PNG|JPG"
), param('id').isInt()]
   , async (req, res, next) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      //Get the service to use for the graph
      const renderServiceName = await (await axios.get(process.env.DBREADER_ADDR + "/graphs/" + req.params.id + "/renderServiceName")).data;

      var address;

      //Get the address of the corresponding renderer
      switch (renderServiceName) {
         case "XYCharter":
            address = process.env.XYCHARTERRENDER_ADDR;
            break;
         case "QuickChart":
            address = process.env.QUICKCHARTRENDER_ADDR;
            break;
         default:
            res.status(500).send("Render inconnu")
      }

      await axios.get(address + "/graphs/" + req.params.id + "?type=" + req.query.type, {
         responseType: 'arraybuffer'
      }).then(response => {

         const responseBase64 = Buffer.from(response.data, 'binary').toString('base64')
         res.status(201).send({ data: `data:${response.headers['content-type'].toLowerCase()};base64,${responseBase64}` });
         next();
      });

   });

renderRouter.get('/ping'
   , async (req, res, next) => {

      return res.status(200).send("ok");

   });

module.exports = renderRouter;
